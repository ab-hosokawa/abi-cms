import React, { useRef } from 'react'
import { useEditItem, useRegisterItem } from '../../utils/hooks/useCommonUtils.js'
import { useNavigation } from '../../utils/hooks/useNavigation.js'
import { Heading } from '../../utils/components/parts/Heading'
import { FormBuilder } from '../../utils/components/form/FormBuilder'
import { Button } from 'react-bootstrap'
import { getMockDetail, mockModel } from '../../utils/mock.js'
import { useParams } from 'react-router-dom'

export const Form = () => {
  const { id } = useParams()
  const formRef = useRef()
  const { navigateTo } = useNavigation()
  const baseEndpoint = '/api/fe/step2/1/model/'
  const formSettings = [
    { formId: 'form-title', name: 'title', label: '名前' },
    { formId: 'form-alias', name: 'alias', label: 'エイリアス' },
  ]
  const { item } = useEditItem({ baseEndpoint })
  const { isSaving, onSaving } = useRegisterItem({
    baseEndpoint: baseEndpoint,
    updatePath: '/update',
    onSuccess: () => {
      navigateTo('/step2_1/')
    },
  })

  return (
    <>
      <Heading title={'STEP2-1 モデル登録'} />
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
