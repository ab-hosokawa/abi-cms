import React, { useEffect, useImperativeHandle, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { FormGroup } from './Forms.jsx'

export const FormBuilder = React.forwardRef(({ formSettings = [], onSave = () => {}, defaultValue = {} }, ref) => {
  const inputRef = useRef({})
  useImperativeHandle(
    ref,
    () => ({
      getInputValue: () => {
        return inputRef.current
      },
    }),
    []
  )

  useEffect(() => {
    formSettings.map((setting) => {
      inputRef.current[setting.name] = defaultValue?.[setting.name]
    })
  }, [defaultValue])

  return (
    <>
      <Form>
        {React.Children.toArray(
          formSettings.map((setting) => {
            const { onChangeCustom = null, setDefaultValue = null, ...rest } = setting
            return (
              <FormGroup
                onChange={(val, e) => {
                  if (onChangeCustom) {
                    onChangeCustom(inputRef.current, val, e)
                  } else {
                    inputRef.current[setting.name] = val
                  }
                }}
                defaultValue={(() => {
                  if (setDefaultValue) {
                    return setDefaultValue()
                  } else {
                    return defaultValue?.[setting.name]
                  }
                })()}
                {...rest}
              />
            )
          })
        )}
      </Form>
    </>
  )
})
