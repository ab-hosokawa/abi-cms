import React from 'react'
import { Col, Row } from 'react-bootstrap'

export const Heading = ({ title, children, ...rest }) => {
  return (
    <>
      <Row className={'mb-3'}>
        <Col>
          <h1 className={'h3'}>{title}</h1>
        </Col>
        <Col sm={'auto'}>{children}</Col>
      </Row>
    </>
  )
}
