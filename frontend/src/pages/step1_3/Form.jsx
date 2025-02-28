import React, { useRef, useState } from 'react'
import { Heading } from '../../utils/components/parts/Heading'
import { Button } from 'react-bootstrap'
import { FormBuilder } from '../../utils/components/form/FormBuilder'
import { useApiExec } from '../../utils/hooks/useApi.js'
import { useNavigation } from '../../utils/hooks/useNavigation.js'
import { useRegisterItem } from '../../utils/hooks/useCommonUtils.js'

export const Form = () => {
  const formRef = useRef()
  const { navigateTo } = useNavigation()
  const baseEndpoint = '/api/fe/step1/3/'
  const formSettings = [
    { formId: 'form-title', name: 'title', label: 'タイトル' },
    { formId: 'form-body', name: 'body', label: '本文' },
  ]
  const { isSaving, onSaving } = useRegisterItem({
    baseEndpoint: baseEndpoint,
    onSuccess: () => {
      navigateTo('/step1_3/')
    },
  })

  return (
    <>
      <Heading title={'STEP1-3 登録'} />
      <FormBuilder formSettings={formSettings} ref={formRef} />
      <Button
        disabled={isSaving}
        onClick={() => {
          let inputs = formRef.current?.getInputValue()
          if (!inputs.title || !inputs.body || inputs.title === '' || inputs.body === '') {
            alert('入力してください')
            return
          }
          onSaving(inputs)
        }}
      >
        登録
      </Button>
    </>
  )
}
