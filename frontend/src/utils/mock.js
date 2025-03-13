export const mockModel = [
  { id: 1, title: '新着情報', name: 'news' },
  { id: 2, title: 'ブログ', name: 'blog' },
]

export const mockField = [
  { id: 1, model_id: 1, title: 'タイトル', name: 'title', type: 'text' },
  { id: 2, model_id: 1, title: '本文', name: 'body', type: 'textarea' },
]

export const getMockDetail = (id, mockData = []) => {
  const item = mockData.find((elem) => elem.id === parseInt(id))

  return item
}
