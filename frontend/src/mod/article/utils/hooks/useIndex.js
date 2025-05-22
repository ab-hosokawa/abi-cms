import React, { useState } from 'react'
import { useNavigation } from '../../../../utils/hooks/useNavigation.js'
import { useFetchItems } from '../../../../utils/hooks/useCommonUtils.js'

export const useIndex = () => {
  const { navigateTo } = useNavigation()
  const endpoint = '/api/article/admin'
  const [data, setData] = useState([])

  const { current, setCurrent, pages, fetchList } = useFetchItems({
    endpoint: endpoint + '/list',
    onSuccess: ({ data }) => {
      setData(data.payload.data)
    },
  })

  const columns = [
    { key: 'title', label: 'タイトル', _props: { style: { width: '30%' } } },
    { key: 'body', label: '本文' },
    { key: 'actions', label: '', _props: { style: { width: '10%' } } },
  ]

  const onChgPage = (page) => setCurrent(page)

  return { navigateTo, data, pages, current, columns, fetchList, onChgPage, endpoint }
}
