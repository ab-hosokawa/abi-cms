import React, { useEffect, useState } from 'react'
import { useModel } from '../../utils/hooks/useModel.js'
import { useNavigation } from '../../utils/hooks/useNavigation.js'
import { useFetchItems } from '../../utils/hooks/useCommonUtils.js'
import { Button } from 'react-bootstrap'
import { Heading } from '../../utils/components/parts/Heading.jsx'
import { ListTable } from '../../utils/components/parts/ListTable.jsx'
import { ListPagination } from '../../utils/components/parts/ListPagination.jsx'
import { useField } from '../../utils/hooks/useField.js'

export const Index = () => {
  const { modelId, modelData } = useModel()
  const { fields } = useField()
  const { navigateTo } = useNavigation()
  const endpoint = '/api/fe/step2/2/' + modelId + '/content'
  const [data, setData] = useState([
    { id: 1, title: 'タイトル1', comment: 'コメント1' },
    { id: 2, title: 'タイトル2', comment: 'コメント2' },
    { id: 3, title: 'タイトル3', comment: 'コメント3' },
  ])
  const [columns, setColumns] = useState([])

  const { current, setCurrent, pages, fetchList } = useFetchItems({
    endpoint,
    onSuccess: ({ data }) => {
      setData(data.payload.data)
    },
  })

  useEffect(() => {
    let newColumns = []
    if (fields.length > 0) {
      // 最初のフィールドを見出しとする
      let firstClm = fields[0]
      newColumns.push({ key: firstClm.display_name, label: firstClm.title, _props: { style: { width: '85%' } } })
      newColumns.push({ key: 'actions', label: '', _props: { style: { width: '15%' } } })
    }
    setColumns(newColumns)
  }, [fields])

  const scopedColumns = {
    actions: (item) => {
      return (
        <td className={'text-center'}>
          <Button
            onClick={() => {
              navigateTo(`/step2_2/${modelId}/content/${item.id}/`)
            }}
            variant={'outline-primary'}
            size={'sm'}
          >
            編集
          </Button>
        </td>
      )
    },
  }

  return (
    <>
      <Heading title={`STEP2-2 ${modelData ? modelData.title : ''} 記事一覧`}>
        <Button
          onClick={() => {
            navigateTo(`/step2_2/${modelId}/content/new/`)
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
