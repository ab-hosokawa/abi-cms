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
            return (
              <FormGroup
                onChange={(val, e) => {
                  inputRef.current[setting.name] = val
                  if (typeof setting.onChangeCustom !== 'undefined') {
                    setting.onChangeCustom(val, e)
                  }
                }}
                defaultValue={defaultValue?.[setting.name]}
                {...setting}
              />
            )
          })
        )}
      </Form>
    </>
  )
})
