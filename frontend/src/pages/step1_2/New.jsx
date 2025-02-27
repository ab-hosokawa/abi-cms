import React, { useRef, useState } from 'react'
import { Heading } from '../../utils/components/parts/Heading'
import { Button } from 'react-bootstrap'
import { FormBuilder } from '../../utils/components/form/FormBuilder'
import { useApiExec } from '../../utils/hooks/useApi.js'
import { useNavigation } from '../../utils/hooks/useNavigation.js'

export const New = () => {
  const formRef = useRef()
  const { navigateTo } = useNavigation()
  const [isSaving, setIsSaving] = useState(false)
  const { onExec } = useApiExec()
  const endpoint = '/api/fe/step1/2/store'
  const formSettings = [
    { formId: 'form-title', name: 'title', label: 'タイトル' },
    { formId: 'form-body', name: 'body', label: '本文' },
  ]

  // 登録ボタン
  const onSaving = () => {
    // 入力データ取得
    let inputs = formRef.current?.getInputValue()
    if (!inputs.title || !inputs.body || inputs.title === '' || inputs.body === '') {
      alert('入力してください')
      return
    }
    onExec({
      endpoint: endpoint,
      method: 'post',
      status: 201,
      params: inputs,
      onBefore: () => {
        setIsSaving(true)
      },
      onSuccess: () => {
        navigateTo('/step1_2/')
      },
      onError: () => {
        alert('入力エラーがあります')
      },
      onAfter: () => {
        setIsSaving(false)
      },
    })
  }

  return (
    <>
      <Heading title={'STEP1-2 登録'} />
      <FormBuilder formSettings={formSettings} ref={formRef} />
      <Button disabled={isSaving} onClick={() => onSaving()}>
        登録
      </Button>
    </>
  )
}
