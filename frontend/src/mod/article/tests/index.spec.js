// @ts-check
import { test, expect } from '@playwright/test'
import { pageUrl, endpoint, item, naming } from './config.js'
import { getApiResponse, findRowFromId } from '../../../../tests/utils.js'

const addIds = []

test.beforeAll(async ({ request }) => {
  // add 15 items
  for (let i = 1; i <= 15; i++) {
    let response = await request.post(endpoint + 'store', { data: { ...item, ...{ title: `${item.title}-${i}` } } })
    if (response.ok()) {
      let json = await response.json()
      addIds.push(json.payload.data.id)
    }
  }
})

test.afterAll(async ({ request }) => {
  // delete test data
  for (let i = 0; i < addIds.length; i++) {
    await request.delete(endpoint + 'delete/' + addIds[i])
  }
})

test.describe('index test', () => {
  const init = async (page) => {
    await page.goto(pageUrl)
    await getApiResponse(page, endpoint + 'list')
  }

  // ページ表示テスト
  test('show page', async ({ page }) => {
    await init(page)
    await expect(page.getByRole('heading', { name: naming.heading.list })).toBeVisible()
  })

  // 1ページ目件数テスト
  test('confirm page 1 count', async ({ page }) => {
    await init(page)
    const rows = await page.locator('tbody tr')

    // 10件かどうか
    await expect(rows).toHaveCount(10)
  })

  // 2ページ目件数テスト
  test('confirm page 2 count', async ({ page }) => {
    await init(page)

    // 2ページ目クリック
    const next = await page.getByRole('button', { name: '2' })
    await next.click()
    const response = await getApiResponse(page, endpoint + 'list')

    const rows = await page.locator('tbody tr')
    const json = await response.json()

    // 取得したdataと表示件数が合ってるかどうか
    await expect(rows).toHaveCount(json.payload.data.length)
  })

  // 追加ページ遷移テスト
  test('go to new page', async ({ page }) => {
    await init(page)
    const button = await page.getByRole('button', { name: naming.button.new })
    await button.click()
    await expect(page.getByRole('heading', { name: naming.heading.new })).toBeVisible()
  })

  // 編集ページ遷移テスト
  test('go to edit page', async ({ page }) => {
    await init(page)

    const id = addIds[0] ?? null
    if (id) {
      const item = await findRowFromId(page, id, endpoint + 'list')
      if (!item) throw new Error('no item')
      const button = await item.getByRole('button', { name: naming.button.edit })
      await button.click()
      await expect(page.getByRole('heading', { name: naming.heading.edit })).toBeVisible()
    }
  })

  // 記事削除テスト
  test('delete item', async ({ page }) => {
    await init(page)

    const id = addIds[0] ?? null
    if (id) {
      const item = await findRowFromId(page, id, endpoint + 'list')
      if (!item) throw new Error('no item')
      const button = await item.getByRole('button', { name: naming.button.delete })
      await button.click()

      // 確認ダイアログ表示
      page.on('dialog', async (dialog) => {
        await expect(dialog.type()).toBe('confirm')
        await expect(dialog.message()).toBe(naming.message.delete_confirm)
        await dialog.accept()
        const response = await getApiResponse(page, endpoint + 'delete/' + id)
        await expect(response.status()).toBe(204)
      })
    }
  })
})
