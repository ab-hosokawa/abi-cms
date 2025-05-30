import { test, expect } from '@playwright/test'
import { pageUrl, endpoint, item, naming } from './config.js'
import { getApiResponse } from '../../../../tests/utils.js'

let testId = null

test.beforeAll(async ({ request }) => {
  // 記事1件登録
  const response = await request.post(endpoint + 'store', { data: item })
  const json = await response.json()
  testId = json.payload.data.id
})

test.afterAll(async ({ request }) => {
  // 作成した記事削除
  if (testId) {
    await request.delete(endpoint + 'delete/' + testId)
  }
})

test.describe('edit test', () => {
  const init = async (page) => {
    await page.goto(pageUrl + '/edit/' + testId)
    await getApiResponse(page, endpoint + 'detail/' + testId)
  }

  // ページ表示テスト
  test('show page', async ({ page }) => {
    await init(page)
    await expect(page.getByRole('heading', { name: naming.heading.edit })).toBeVisible()
    const formItem = await page.locator('input[name="title"]')
    await expect(formItem).toHaveValue(item.title)
  })

  // 戻るボタンテスト
  test('go to list page', async ({ page }) => {
    await init(page)
    const button = await page.getByRole('button', { name: naming.button.back })
    await button.click()
    await expect(page.getByRole('heading', { name: naming.heading.list })).toBeVisible()
  })

  // 記事編集テスト
  test('save update success', async ({ page }) => {
    await init(page)

    // フォーム入力
    for (const key in item) {
      let formItem = await page.locator('[name="' + key + '"]')
      await formItem.fill(item[key] + ' edit')
    }

    // 登録ボタン
    const button = await page.getByRole('button', { name: naming.button.save })
    await button.click()

    // 更新確認
    const response = await getApiResponse(page, endpoint + 'update/' + testId)
    await expect(response.status()).toBe(204)
  })

  // 変更確認
  test('confirm update date', async ({ page }) => {
    await init(page)
    const formItem = await page.locator('[name="title"]')
    await expect(formItem).toHaveValue(item.title + ' edit')
  })
})
