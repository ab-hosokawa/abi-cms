import React, { useState } from 'react'
import { useNavigation } from '../../utils/hooks/useNavigation.js'
import { useGetFetch } from '../../utils/hooks/useCommonUtils.js'
import { Heading } from '../../utils/components/parts/Heading.jsx'
import { Button, ButtonGroup } from 'react-bootstrap'
import { ListTable } from '../../utils/components/parts/ListTable.jsx'
import { ListPagination } from '../../utils/components/parts/ListPagination'

export const Index = () => {
  const { navigateTo } = useNavigation()
  const endpoint = '/api/fe/step1/3'
  const [data, setData] = useState([])

  const { current, setCurrent, pages } = useGetFetch({
    endpoint: endpoint,
    onSuccess: ({ data }) => {
      setData(data.payload.data)
    },
  })

  const columns = [
    { key: 'title', label: 'タイトル', _props: { style: { width: '30%' } } },
    { key: 'body', label: '本文' },
    { key: 'actions', label: '', _props: { style: { width: '10%' } } },
  ]

  const scopedColumns = {
    actions: (item) => {
      return (
        <td className={'text-center'}>
          <ButtonGroup>
            <Button size={'sm'} variant={'outline-primary'} onClick={() => navigateTo('/step1_3/' + item.id + '/')}>
              編集
            </Button>
            <Button size={'sm'} variant={'outline-danger'}>
              削除
            </Button>
          </ButtonGroup>
        </td>
      )
    },
  }

  return (
    <>
      <Heading title={'STEP1-3 一覧'} />
      <ListTable columns={columns} items={data} current={current} pages={pages} scopedColumns={scopedColumns} />
      <ListPagination current={current} pages={pages} onChgPage={(page) => setCurrent(page)} />
    </>
  )
}
