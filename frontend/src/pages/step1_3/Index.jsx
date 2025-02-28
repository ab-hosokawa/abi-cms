import React, { useState } from 'react'
import { useNavigation } from '../../utils/hooks/useNavigation.js'
import { useGetFetch } from '../../utils/hooks/useCommonUtils.js'
import { Heading } from '../../utils/components/parts/Heading.jsx'
import { Button } from 'react-bootstrap'
import { ListTable } from '../../utils/components/parts/ListTable.jsx'
import { ListPagination } from '../../utils/components/parts/ListPagination'

export const Index = () => {
  const { navigateTo } = useNavigation()
  const endpoint = '/api/fe/step1/3'
  const [data, setData] = useState([])
  const [current, setCurrent] = useState(1)
  const [pages, setPages] = useState(null)

  useGetFetch({
    endpoint: endpoint,
    onSuccess: ({ data }) => {
      setData(data.payload.data)
      setCurrent(data.payload.current)
      setPages(data.payload.pages)
    },
    current: current,
  })

  const columns = [
    { key: 'title', label: 'タイトル', _props: { style: { width: '30%' } } },
    { key: 'body', label: '本文' },
  ]

  return (
    <>
      <Heading title={'STEP1-3 一覧'}>
        <Button
          onClick={() => {
            navigateTo('/step1_3/new/')
          }}
        >
          新規作成
        </Button>
      </Heading>
      <ListTable columns={columns} items={data} current={current} pages={pages} />
      <ListPagination current={current} pages={pages} onChgPage={(page) => setCurrent(page)} />
    </>
  )
}
