/**
 * APIレスポンス取得
 */
export const getApiResponse = async (page, endpoint) => {
  const response = await page.waitForResponse((res) => {
    return res.url().includes(endpoint)
  })

  return response
}

/**
 * 一覧で指定したIDの行を取得
 */
export const findRowFromId = async (page, targetId, endpoint, current = 1) => {
  await getApiResponse(page, endpoint)

  let row = page.locator(`tr#row-${targetId}`)

  // 見つけられなかったら次のページへ
  if (!(await row.isVisible())) {
    current++
    const btn = await page.getByRole('button', { name: current })
    if (await btn.isVisible()) {
      await btn.click()
      row = findRowFromId(page, targetId, endpoint, current)
    }
  }

  return row
}
