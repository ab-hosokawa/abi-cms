import React, { useEffect, useImperativeHandle, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { FormGroup } from './Forms.jsx'

export const FormBuilder = React.forwardRef(({ formSettings = [], onSave = () => {} }, ref) => {
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
      inputRef.current[setting.name] = null
    })
  }, [])

  return (
    <>
      <Form>
        {React.Children.toArray(
          formSettings.map((setting) => {
            return (
              <FormGroup
                onChange={(val, e) => {
                  inputRef.current[setting.name] = val
                }}
                {...setting}
              />
            )
          })
        )}
      </Form>
    </>
  )
})
