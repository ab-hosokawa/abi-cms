import React from 'react'
import { Heading } from '../../../utils/components/parts/Heading.jsx'
import { config } from '../utils/config.js'
import { Form } from '../utils/components/Form.jsx'

export const Edit = () => {
  return (
    <>
      <Heading title={`${config.name} 編集`} />
      <Form />
    </>
  )
}
