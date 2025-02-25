import { Form } from 'react-bootstrap'

export const FormGroup = ({ type = 'text', formId = '', label = '', ...rest }) => {
  return (
    <>
      <Form.Group className={'mb-3'} controlId={formId}>
        <Form.Label>{label}</Form.Label>
        {(() => {
          switch (type) {
            default:
              return (
                <>
                  <FormInput type={type} formId={formId} {...rest} />
                </>
              )
          }
        })()}
      </Form.Group>
    </>
  )
}

export const FormInput = ({ type, formId, ...rest }) => {
  return (
    <>
      <Form.Control type={type} id={formId} {...rest} />
    </>
  )
}
