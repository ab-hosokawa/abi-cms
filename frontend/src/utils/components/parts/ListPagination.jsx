import React from 'react'
import { Pagination } from 'react-bootstrap'

export const ListPagination = ({ current = 1, pages = 1, size = 'sm', onChgPage = () => {}, visible = 5, ...rest }) => {
  const createItems = () => {
    const items = []
    const startPage = Math.max(1, current - Math.floor(visible / 2))
    const endPage = Math.min(pages, startPage + visible - 1)

    // 最初のページ
    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => onChgPage(1)}>
          1
        </Pagination.Item>
      )
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key={'start-ellipsis'} />)
      }
    }

    // 中央部分のページ
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item key={page} active={page === current} onClick={() => onChgPage(page)}>
          {page}
        </Pagination.Item>
      )
    }

    return items
  }

  return (
    <>
      <div className={'d-flex justify-content-end'}>
        <Pagination size={size}>
          <Pagination.Prev
            onClick={() => {
              onChgPage(Math.max(1, current - 1))
            }}
            disabled={current === 1}
          />
          {createItems()}
          <Pagination.Next
            onClick={() => {
              onChgPage(Math.min(pages, current + 1))
            }}
            disabled={current === pages}
          />
        </Pagination>
      </div>
    </>
  )
}
