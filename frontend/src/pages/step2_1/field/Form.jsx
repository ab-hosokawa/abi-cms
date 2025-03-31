import React, { useRef } from 'react'
import { useNavigation } from '../../../utils/hooks/useNavigation.js'
import { useModel } from '../../../utils/hooks/useModel.js'
import { useEditItem, useRegisterItem } from '../../../utils/hooks/useCommonUtils.js'
import { Heading } from '../../../utils/components/parts/Heading.jsx'
import { FormBuilder } from '../../../utils/components/form/FormBuilder.jsx'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getMockDetail, mockField } from '../../../utils/mock.js'
import { fieldTypes } from '../../../utils/const.js'

export const Form = () => {
  const { modelId, modelData } = useModel()
  const { id } = useParams()

  const formRef = useRef()
  const { navigateTo } = useNavigation()
  const baseEndpoint = '/api/fe/step2/1/' + modelId + '/field/'
  const formSettings = [
    { formId: 'form-key', name: 'title', label: 'タイトル' },
    { formId: 'form-title', name: 'display_name', label: '表示名' },
    { formId: 'form-type', name: 'type', label: 'タイプ', type: 'select', choices: fieldTypes, placeholder: '選択してください' },
  ]

  const { item } = useEditItem({ baseEndpoint })

  const { isSaving, onSaving } = useRegisterItem({
    baseEndpoint: baseEndpoint,
    updatePath: '/update',
    onSuccess: () => {
      navigateTo(`/step2_1/${modelId}/field/`)
    },
  })

  return (
    <>
      <Heading title={`STEP2-1 ${modelData.title} フィールド登録`} />
      <FormBuilder formSettings={formSettings} ref={formRef} defaultValue={item} />
      <Button
        disabled={isSaving}
        onClick={() => {
          let inputs = formRef.current?.getInputValue()
          onSaving(inputs)
        }}
      >
        登録
      </Button>
    </>
  )
}
