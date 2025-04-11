import React, { useState } from 'react'
import { useModel } from '../../../utils/hooks/useModel.js'
import { Heading } from '../../../utils/components/parts/Heading'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useNavigation } from '../../../utils/hooks/useNavigation.js'
import { useDeleteItem, useFetchItems } from '../../../utils/hooks/useCommonUtils.js'
import { ListTable } from '../../../utils/components/parts/ListTable'
import { ListPagination } from '../../../utils/components/parts/ListPagination'
import { fieldTypes } from '../../../utils/const.js'
import { getArrayToText } from '../../../utils/common.js'
import { mockField } from '../../../utils/mock.js'

export const Index = () => {
  const { modelId, modelData } = useModel()
  const { navigateTo } = useNavigation()
  const endpoint = '/api/fe/step2/1/' + modelId + '/field'
  const [data, setData] = useState([])

  const { current, setCurrent, pages, fetchList } = useFetchItems({
    endpoint,
    onSuccess: ({ data }) => {
      setData(data.payload.data)
    },
  })
  const { confirmDelete } = useDeleteItem({ baseEndpoint: endpoint + '/', deletePath: '/destroy' })

  const columns = [
    { key: 'display_name', label: '表示名', _props: { style: { width: '30%' } } },
    { key: 'title', label: 'キー名', _props: { style: { width: '30%' } } },
    { key: 'type', label: 'タイプ', _props: { style: { width: '30%' } } },
    { key: 'actions', label: '', _props: { style: { width: '10%' } } },
  ]

  const scopedColumns = {
    type: (item) => {
      return <td>{getArrayToText(fieldTypes, item.type)}</td>
    },
    actions: (item) => {
      return (
        <td className={'text-center'}>
          <ButtonGroup>
            <Button
              onClick={() => {
                navigateTo(`/step2_1/${modelId}/field/${item.id}/`)
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

  return (
    <>
      <Heading title={`STEP2-1 ${modelData.title} フィールド一覧`}>
        <Button
          onClick={() => {
            navigateTo(`/step2_1/${modelId}/field/new/`)
          }}
        >
          登録
        </Button>
      </Heading>
      <ListTable columns={columns} scopedColumns={scopedColumns} items={data} />
      <ListPagination current={current} pages={pages} onChgPage={(page) => setCurrent(page)} />
    </>
  )
}
