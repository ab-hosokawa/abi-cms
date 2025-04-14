import React, { useRef, useState, useEffect } from 'react'
import { Heading } from '../../utils/components/parts/Heading.jsx'
import { FormBuilder } from '../../utils/components/form/FormBuilder.jsx'
import { useEditItem } from '../../utils/hooks/useCommonUtils.js'
import { useFindModel } from '../../utils/hooks/useModel.js'
import { useFindField } from '../../utils/hooks/useField.js'
import { Col, Row } from 'react-bootstrap'
import { Preview } from '../../utils/components/form/Preview'

export const Form = ({ config }) => {
  const formRef = useRef()
  const baseEndpoint = '/api/fe/step2/2/content/'
  const [formSettings, setFormSettings] = useState([])
  const { fetch } = useFindModel()
  const { findByModel } = useFindField()
  let baseFormSettings = []
  let init = false
  const [item, setItem] = useState({})
  const [isLoad, setIsLoad] = useState(false)
  const { id, findItem } = useEditItem({ baseEndpoint, isUseEffect: false })
  const previewRef = useRef()

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
              onChangeCustom: (inputVals, val) => {
                if (typeof inputVals['fields'] === 'undefined') {
                  inputVals['fields'] = {}
                }
                inputVals['fields'][title] = {
                  id: model.id,
                  value: val,
                }

                let sendData = {}
                for (let key in inputVals['fields']) {
                  sendData[`fields.${key}`] = inputVals['fields'][key]['value']
                }
                previewRef.current?.onChange(sendData)
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
      <Heading title={`STEP2-3 プレビュー`} />
      {isLoad && (
        <>
          <Row>
            <Col sm={6}>
              <FormBuilder formSettings={formSettings} ref={formRef} defaultValue={item} />
            </Col>
            <Col sm={6}>
              <Preview config={config} ref={previewRef} />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
