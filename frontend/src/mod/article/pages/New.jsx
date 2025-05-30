import React from 'react'
import { Heading } from '../../../utils/components/parts/Heading'
import { config } from '../utils/config.js'
import { Form } from '../utils/components/Form.jsx'
import { useNavigation } from '../../../utils/hooks/useNavigation.js'

export const New = () => {
  const { navigateTo } = useNavigation()
  return (
    <>
      <Heading title={`${config.name} 追加`} backSetting={{ onClick: () => navigateTo(config.path) }} />
      <Form />
    </>
  )
}
