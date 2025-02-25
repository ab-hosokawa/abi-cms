import React from 'react'
import { Heading } from '../../utils/components/parts/Heading'
import { Button, Form } from 'react-bootstrap'
import { FormGroup } from '../../utils/components/form/Forms.jsx'

export const New = () => {
  return (
    <>
      <Heading title={'STEP1-2 登録'} />
      <Form>
        <FormGroup formId={'form-title'} label={'タイトル'} />
        <FormGroup formId={'form-body'} label={'本文'} />
        <Button>登録</Button>
      </Form>
    </>
  )
}
