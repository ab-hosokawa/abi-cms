import React from 'react'
import { Heading } from '../../utils/components/parts/Heading.jsx'
import { Button } from 'react-bootstrap'
import { useNavigation } from '../../utils/hooks/useNavigation.js'

export const Index = () => {
  const { navigateTo } = useNavigation()

  return (
    <>
      <Heading title={'STEP1-2 一覧'}>
        <Button
          onClick={() => {
            navigateTo('/step1_2/new/')
          }}
        >
          新規作成
        </Button>
      </Heading>
    </>
  )
}
