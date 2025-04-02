import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '../../utils/hooks/useNavigation.js'
import { useModel } from '../../utils/hooks/useModel.js'
import { useField } from '../../utils/hooks/useField.js'
import { useEditItem, useRegisterItem } from '../../utils/hooks/useCommonUtils.js'
import { Heading } from '../../utils/components/parts/Heading'
import { FormBuilder } from '../../utils/components/form/FormBuilder.jsx'
import { Button } from 'react-bootstrap'

export const Form = () => {
  const { modelId, modelData } = useModel()
  const { fields } = useField()
  const formRef = useRef()
  const { navigateTo } = useNavigation()
  const baseEndpoint = '/api/fe/step2/2/' + modelId + '/content/'
  const [formSettings, setFormSettings] = useState([])

  const { item } = useEditItem({ baseEndpoint })
  const { isSaving, onSaving } = useRegisterItem({
    baseEndpoint: baseEndpoint,
    updatePath: '/update',
    onError: () => {},
    onSuccess: () => {
      navigateTo('/step2_2/' + modelId + '/content/')
    },
    onAfter: () => {
      navigateTo('/step2_2/' + modelId + '/content/')
    },
  })

  useEffect(() => {
    let newFormSettings = []
    fields?.map((field) => {
      newFormSettings.push({ formId: `form-${field.display_name}`, name: field.display_name, label: field.title, type: field.type })
    })
    setFormSettings(newFormSettings)
  }, [fields])

  return (
    <>
      <Heading title={`STEP2-2 ${modelData ? modelData.title : ''} 記事登録`} />
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
