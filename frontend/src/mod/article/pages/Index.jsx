import React from 'react'
import { useIndex } from '../utils/hooks/useIndex.js'
import { Heading } from '../../../utils/components/parts/Heading.jsx'
import { ListTable } from '../../../utils/components/parts/ListTable.jsx'
import { ListPagination } from '../../../utils/components/parts/ListPagination.jsx'
import { config } from '../utils/config.js'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useDeleteItem } from '../../../utils/hooks/useCommonUtils.js'

export const Index = () => {
  const { columns, data, current, pages, onChgPage, navigateTo, endpoint, fetchList } = useIndex()
  const { confirmDelete } = useDeleteItem({ baseEndpoint: endpoint + '/delete/' })

  const scopedColumns = {
    actions: (item) => {
      return (
        <td className={'text-center'}>
          <ButtonGroup>
            <Button size={'sm'} variant={'outline-primary'} onClick={() => navigateTo(config.path + '/edit/' + item.id)}>
              編集
            </Button>
            <Button
              size={'sm'}
              variant={'outline-danger'}
              onClick={() => {
                confirmDelete(item.id, () => {
                  fetchList()
                })
              }}
            >
              削除
            </Button>
          </ButtonGroup>
        </td>
      )
    },
  }

  return (
    <>
      <Heading title={`${config.name} 一覧`}>
        <Button
          onClick={() => {
            navigateTo(`${config.path}/new`)
          }}
        >
          新規作成
        </Button>
      </Heading>
      <ListTable columns={columns} items={data} current={current} pages={pages} scopedColumns={scopedColumns} />
      <ListPagination current={current} pages={pages} onChgPage={(page) => onChgPage(page)} />
    </>
  )
}
