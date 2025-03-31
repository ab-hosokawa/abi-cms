import React, { useState } from 'react'
import { Heading } from '../../utils/components/parts/Heading'
import { useNavigation } from '../../utils/hooks/useNavigation.js'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useFetchItems } from '../../utils/hooks/useCommonUtils.js'
import { ListTable } from '../../utils/components/parts/ListTable.jsx'
import { ListPagination } from '../../utils/components/parts/ListPagination.jsx'

export const Index = () => {
  const { navigateTo } = useNavigation()
  const endpoint = '/api/fe/step2/1/model'
  const [data, setData] = useState([])

  const { current, setCurrent, pages, fetchList } = useFetchItems({
    endpoint: endpoint,
    onSuccess: ({ data }) => {
      setData(data.payload.data)
    },
  })

  const columns = [
    { key: 'title', label: 'モデル名', _props: { style: { width: '80%' } } },
    { key: 'actions', label: '', _props: { style: { width: '20%' } } },
  ]

  const scopedColumns = {
    actions: (item) => {
      return (
        <td className={'text-center'}>
          <ButtonGroup>
            <ButtonGroup>
              <Button
                size={'sm'}
                variant={'outline-primary'}
                onClick={() => {
                  navigateTo(`/step2_1/${item.id}/`)
                }}
              >
                編集
              </Button>
              <Button
                size={'sm'}
                variant={'outline-secondary'}
                onClick={() => {
                  navigateTo(`/step2_1/${item.id}/field/`)
                }}
              >
                フィールド編集
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </td>
      )
    },
  }

  return (
    <>
      <Heading title={'STEP2-1 モデル一覧'}>
        <Button onClick={() => navigateTo('/step2_1/new/')}>新規作成</Button>
      </Heading>
      <ListTable columns={columns} items={data} current={current} pages={pages} scopedColumns={scopedColumns} />
      <ListPagination current={current} pages={pages} onChgPage={(page) => setCurrent(page)} />
    </>
  )
}
