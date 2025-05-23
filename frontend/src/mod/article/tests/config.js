import { config as modConfig } from '../utils/config.js'

export const pageUrl = 'http://localhost:8080/#/article'
export const endpoint = 'http://localhost:8080/api/article/admin/'
export const item = {
  title: 'title',
}
export const naming = {
  heading: {
    list: `${modConfig.name} 一覧`,
    new: `${modConfig.name} 追加`,
    edit: `${modConfig.name} 編集`,
  },
  button: {
    new: '新規作成',
    edit: '編集',
    delete: '削除',
    save: '登録',
  },
  message: {
    delete_confirm: '削除しますか？',
  },
}
