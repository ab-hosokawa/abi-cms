import React from 'react'
import { Heading } from '../../../utils/components/parts/Heading.jsx'
import { config } from '../utils/config.js'
import { Form } from '../utils/components/Form.jsx'
import { useNavigation } from '../../../utils/hooks/useNavigation.js'

export const Edit = () => {
  const { navigateTo } = useNavigation()
  return (
    <>
      <Heading title={`${config.name} 編集`} backSetting={{ onClick: () => navigateTo(config.path) }} />
      <Form />
    </>
  )
}
