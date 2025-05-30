import React from 'react'
import { useIndex } from '../utils/hooks/useIndex.js'
import { Heading } from '../../../utils/components/parts/Heading.jsx'
import { ListTable } from '../../../utils/components/parts/ListTable.jsx'
import { ListPagination } from '../../../utils/components/parts/ListPagination.jsx'
import { config } from '../utils/config.js'
import { useDeleteItem } from '../../../utils/hooks/useCommonUtils.js'
import { ListActions } from '../../../utils/components/parts/ListActions'

export const Index = () => {
  const { columns, data, current, pages, onChgPage, navigateTo, endpoint, fetchList } = useIndex()
  const { confirmDelete } = useDeleteItem({ baseEndpoint: endpoint + '/delete/' })

  const scopedColumns = {
    actions: (item) => {
      return (
        <ListActions
          editSetting={{
            onClick: () => {
              navigateTo(config.path + '/edit/' + item.id)
            },
          }}
          deleteSetting={{
            onClick: () => {
              confirmDelete(item.id, () => {
                fetchList()
              })
            },
          }}
        />
      )
    },
  }

  return (
    <>
      <Heading
        title={`${config.name} 一覧`}
        addSetting={{
          onClick: () => {
            navigateTo(`${config.path}/new`)
          },
        }}
      />
      <ListTable columns={columns} items={data} current={current} pages={pages} scopedColumns={scopedColumns} />
      <ListPagination current={current} pages={pages} onChgPage={(page) => onChgPage(page)} />
    </>
  )
}
