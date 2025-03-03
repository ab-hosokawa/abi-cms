import React, { useEffect, useState } from 'react'
import { Heading } from '../../utils/components/parts/Heading.jsx'
import { Button } from 'react-bootstrap'
import { useNavigation } from '../../utils/hooks/useNavigation.js'
import { useFetchItems } from '../../utils/hooks/useCommonUtils.js'
import { ListTable } from '../../utils/components/parts/ListTable'

export const Index = () => {
  const { navigateTo } = useNavigation()
  const endpoint = '/api/fe/step1/2'
  const [data, setData] = useState([])

  useFetchItems({
    endpoint: endpoint,
    onSuccess: ({ data }) => {
      setData(data.payload.data)
    },
  })

  const columns = [
    { key: 'title', label: 'タイトル', _props: { style: { width: '30%' } } },
    { key: 'body', label: '本文' },
  ]

  return (
    <>
      <Heading title={'STEP1-2 一覧'}>
        <Button
          onClick={() => {
            navigateTo('/step1_2/new/')
          }}
        >
          新規作成
        </Button>
      </Heading>
      <ListTable columns={columns} items={data} />
    </>
  )
}
