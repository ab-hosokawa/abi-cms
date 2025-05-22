import React from 'react'
import { FormBuilder } from '../../../../utils/components/form/FormBuilder.jsx'
import { Button } from 'react-bootstrap'
import { useForm } from '../hooks/useForm.js'

export const Form = () => {
  const { formRef, formSettings, item, onSaving, isSaving } = useForm()

  return (
    <>
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
