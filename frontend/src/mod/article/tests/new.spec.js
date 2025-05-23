import { test, expect } from '@playwright/test'
import { pageUrl, endpoint, item, naming } from './config.js'
import { getApiResponse } from '../../../../tests/utils.js'

let testId = null
test.afterAll(async ({ request }) => {
  // 作成した記事を削除
  if (testId) {
    await request.delete(endpoint + 'delete/' + testId)
  }
})

test.describe('new test', () => {
  const init = async (page) => {
    await page.goto(pageUrl + '/new')
  }

  // ページ表示テスト
  test('show page', async ({ page }) => {
    await init(page)
    await expect(page.getByRole('heading', { name: naming.heading.new })).toBeVisible()
  })

  // 記事登録テスト
  test('save store success', async ({ page }) => {
    await init(page)

    // フォーム入力
    for (const key in item) {
      let formItem = await page.locator(`input[name="${key}"]`)
      await formItem.fill(item[key])
    }

    // 登録ボタンクリック
    const button = await page.getByRole('button', { name: naming.button.save })
    await button.click()

    // 登録処理
    const response = await getApiResponse(page, endpoint + 'store')
    await expect(response.status()).toBe(201)
    const json = await response.json()
    testId = json.payload.data.id
    await expect(json.payload.data.title).toBe(item.title)
  })

  // 登録確認テスト
  test('confirm save data', async ({ page }) => {
    await page.goto(pageUrl + '/edit/' + testId)
    await page.waitForResponse((res) => {
      return res.url().includes(endpoint + 'detail/' + testId)
    })

    const formItem = await page.locator('input[name="title"]')
    await expect(formItem).toHaveValue(item.title)
  })
})
