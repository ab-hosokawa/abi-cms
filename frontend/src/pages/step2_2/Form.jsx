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
  const baseEndpoint = '/api/fe/step2/2/content/'
  const [formSettings, setFormSettings] = useState([])
  let baseFormSettings = []
  let init = false
  const [item, setItem] = useState({})
  const [isLoad, setIsLoad] = useState(false)

  const { id, findItem } = useEditItem({ baseEndpoint, isUseEffect: false })
  const { isSaving, onSaving } = useRegisterItem({
    baseEndpoint: baseEndpoint,
    updatePath: '/update',
    onError: () => {
      alert('登録に失敗しました')
    },
    onSuccess: () => {
      navigateTo('/step2_2/')
    },
  })

  useEffect(() => {
    if (!init) {
      let get_item = {}
      Promise.all([
        new Promise((resolve) => {
          fetch({
            onSuccess: ({ data }) => {
              let models = data?.map((item) => {
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
                  inputVals['fields'] = {}
                  inputVals['model_id'] = val
                  handleChangeModel(val, inputVals)
                },
                disabled: typeof id !== 'undefined',
              })
              setFormSettings(baseFormSettings)
              resolve()
            },
          })
        }),
        new Promise((resolve) => {
          if (id) {
            findItem((data) => {
              get_item = data.payload.data
              resolve()
            })
          } else {
            resolve()
          }
        }),
      ]).then(() => {
        if (get_item?.model_id) {
          handleChangeModel(get_item.model_id, get_item)
        }
        setItem(get_item)
        setIsLoad(true)
      })
    }

    return () => {
      init = true
    }
  }, [])

  // モデル変更
  const handleChangeModel = (val, get_item) => {
    if (val !== '') {
      findByModel(val, {
        onSuccess: ({ data }) => {
          let newSettings = [...baseFormSettings]
          data?.payload?.data.map((model) => {
            const { display_name, title, type } = model
            newSettings.push({
              formId: `form-${title}`,
              name: title,
              label: display_name,
              type: type,
              setDefaultValue: () => {
                if (id) {
                  return get_item?.fields?.[title].value
                } else {
                  return ''
                }
              },
              onChangeCustom: (inputVals, val) => {
                if (typeof inputVals['fields'] === 'undefined') {
                  inputVals['fields'] = {}
                }
                inputVals['fields'][title] = {
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
      {isLoad && (
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
      )}
    </>
  )
}
