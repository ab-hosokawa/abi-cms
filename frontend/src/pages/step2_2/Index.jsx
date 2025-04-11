import React, { useEffect, useState } from 'react'
import { useFindModel, useModel } from '../../utils/hooks/useModel.js'
import { useNavigation } from '../../utils/hooks/useNavigation.js'
import { useDeleteItem, useFetchItems } from '../../utils/hooks/useCommonUtils.js'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Heading } from '../../utils/components/parts/Heading.jsx'
import { ListTable } from '../../utils/components/parts/ListTable.jsx'
import { ListPagination } from '../../utils/components/parts/ListPagination.jsx'
import { useField, useFindField } from '../../utils/hooks/useField.js'
import { getArrayToText } from '../../utils/common.js'

export const Index = () => {
  const endpoint = '/api/fe/step2/2/content'
  const { navigateTo } = useNavigation()

  const model = useFindModel()
  const [modelList, setModelList] = useState([])

  const [data, setData] = useState([])

  const { current, setCurrent, pages, fetchList } = useFetchItems({
    endpoint,
    onSuccess: ({ data }) => {
      setData(data.payload.data)
    },
  })
  const { confirmDelete } = useDeleteItem({ baseEndpoint: endpoint + '/', deletePath: '/destroy' })

  const columns = [
    { key: 'header', label: '見出し', _props: { style: { width: '50%' } } },
    { key: 'model', label: 'モデル', _props: { style: { width: '35%' } } },
    { key: 'actions', label: '', _props: { style: { width: '15%' } } },
  ]

  const scopedColumns = {
    header: (item) => {
      return <td>{item?.fields[0]?.value}</td>
    },
    model: (item) => {
      return <td>{getArrayToText(modelList, item.model_id, 'id', 'title')}</td>
    },
    actions: (item) => {
      return (
        <td className={'text-center'}>
          <ButtonGroup>
            <Button
              onClick={() => {
                navigateTo(`/step2_2/${item.id}/`)
              }}
              variant={'outline-primary'}
              size={'sm'}
            >
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

  useEffect(() => {
    Promise.all([
      new Promise((resolve) => {
        // モデルの取得
        model.fetch({
          onSuccess: ({ data }) => {
            setModelList(data)
          },
          onAfter: () => {
            resolve()
          },
        })
      }),
    ]).then(() => {})
  }, [])

  return (
    <>
      <Heading title={`STEP2-2 記事一覧`}>
        <Button
          onClick={() => {
            navigateTo(`/step2_2/new/`)
          }}
        >
          新規作成
        </Button>
      </Heading>
      <ListTable columns={columns} scopedColumns={scopedColumns} items={data} />
      <ListPagination current={current} pages={pages} onChgPage={(page) => setCurrent(page)} />
    </>
  )
}
