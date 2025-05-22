import React from 'react'
import { Heading } from '../../../utils/components/parts/Heading'
import { config } from '../utils/config.js'
import { Form } from '../utils/components/Form.jsx'

export const New = () => {
  return (
    <>
      <Heading title={`${config.name} 追加`} />
      <Form />
    </>
  )
}
