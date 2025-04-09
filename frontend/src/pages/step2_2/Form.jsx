import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '../../utils/hooks/useNavigation.js'
import { useFindModel, useModel } from '../../utils/hooks/useModel.js'
import { useField, useFindField } from '../../utils/hooks/useField.js'
import { useEditItem, useRegisterItem } from '../../utils/hooks/useCommonUtils.js'
import { Heading } from '../../utils/components/parts/Heading'
import { FormBuilder } from '../../utils/components/form/FormBuilder.jsx'
import { Button } from 'react-bootstrap'

export const Form = () => {
  const formRef = useRef()
  const { navigateTo } = useNavigation()
  const { fetch } = useFindModel()
  const { findByModel } = useFindField()
  const baseEndpoint = '/api/fe/step2/2/'
  const [formSettings, setFormSettings] = useState([])
  let baseFormSettings = []
  let init = false

  const { id, item } = useEditItem({ baseEndpoint })
  const { isSaving, onSaving } = useRegisterItem({
    baseEndpoint: baseEndpoint,
    updatePath: '/update',
    onError: () => {},
    onSuccess: () => {
      navigateTo('/step2_2/')
    },
    onAfter: () => {
      navigateTo('/step2_2/')
    },
  })

  useEffect(() => {
    if (!init) {
      fetch({
        onSuccess: ({ data }) => {
          let models = data?.payload?.data.map((item) => {
            return { label: item.title, value: item.id }
          })
          baseFormSettings.push({
            formId: 'form-model',
            name: 'model_id',
            label: 'モデル',
            type: 'select',
            choices: models,
            placeholder: '選択してください',
            onChangeCustom: (inputVals, val) => {
              handleChangeModel(inputVals, val)
            },
          })
          setFormSettings(baseFormSettings)
        },
      })
    }

    return () => {
      init = true
    }
  }, [])

  // モデル変更
  const handleChangeModel = (inputVals, val) => {
    inputVals['model_id'] = val
    if (val !== '') {
      findByModel(val, {
        onSuccess: ({ data }) => {
          let newSettings = [...baseFormSettings]
          data?.payload?.data.map((model) => {
            const { display_name, title, type } = model
            newSettings.push({
              formId: `form-${display_name}`,
              name: display_name,
              label: title,
              type: type,
              setDefaultValue: () => {
                if (id) {
                  return item?.fields?.[display_name].value
                } else {
                  return ''
                }
              },
              onChangeCustom: (inputVals, val) => {
                if (typeof inputVals['fields'] === 'undefined') {
                  inputVals['fields'] = {}
                }
                inputVals['fields'][display_name] = {
                  id: model.id,
                  value: val,
                }
              },
            })
          })
          setFormSettings(newSettings)
        },
      })
    }
  }

  return (
    <>
      <Heading title={`STEP2-2 記事登録`} />
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
