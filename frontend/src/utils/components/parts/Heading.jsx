import React from 'react'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap'

export const Heading = ({ title, addSetting = {}, backSetting = {}, children, ...rest }) => {
  const actionButtons = []
  if (Object.keys(addSetting).length > 0) {
    actionButtons.push({
      size: 'sm',
      variant: 'outline-primary',
      onClick: () => {},
      label: '新規作成',
      ...addSetting,
    })
  }
  if (Object.keys(backSetting).length > 0) {
    actionButtons.push({
      size: 'sm',
      variant: 'outline-primary',
      onClick: () => {},
      label: '戻る',
      ...backSetting,
    })
  }

  return (
    <>
      <Row className={'mb-3'}>
        <Col>
          <h1 className={'h3'}>{title}</h1>
        </Col>
        <Col sm={'auto'}>
          {children}
          {actionButtons.length > 0 && (
            <ButtonGroup>
              {actionButtons.map((setting, key) => {
                const { label, ...restSetting } = setting
                return (
                  <Button key={key} {...restSetting}>
                    {label}
                  </Button>
                )
              })}
            </ButtonGroup>
          )}
        </Col>
      </Row>
    </>
  )
}
