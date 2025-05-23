import React from 'react'
import { Table } from 'react-bootstrap'

export const ListTable = ({ columns = [], items = [], scopedColumns = {}, tableProps = { striped: true, bordered: true } }) => {
  return (
    <>
      <Table {...tableProps}>
        <thead>
          <tr>
            {columns.map((column, idx) => {
              let props = column._props !== 'undefined' ? column._props : {}
              return (
                <th key={idx} {...props}>
                  {column.label}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {items.map((item, row) => {
            return (
              <tr key={row} id={`row-${item.id}`}>
                {React.Children.toArray(
                  columns.map((column, idx) => {
                    if (typeof scopedColumns[column.key] !== 'undefined') {
                      return scopedColumns[column.key](item, row)
                    } else {
                      return <td key={idx}>{item[column.key]}</td>
                    }
                  })
                )}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
