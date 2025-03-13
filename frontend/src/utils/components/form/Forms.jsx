import { Form } from 'react-bootstrap'

export const FormGroup = ({ type = 'text', formId = '', label = '', ...rest }) => {
  return (
    <>
      <Form.Group className={'mb-3'} controlId={formId}>
        <Form.Label>{label}</Form.Label>
        {(() => {
          switch (type) {
            case 'textarea':
              return (
                <>
                  <FormTextarea {...rest} />
                </>
              )
            case 'select':
              return (
                <>
                  <FormSelect {...rest} />
                </>
              )
            default:
              return (
                <>
                  <FormInput type={type} {...rest} />
                </>
              )
          }
        })()}
      </Form.Group>
    </>
  )
}

export const FormInput = ({ type, onChange = () => {}, ...rest }) => {
  return (
    <>
      <Form.Control
        type={type}
        {...rest}
        onChange={(e) => {
          onChange(e.target.value, e)
        }}
      />
    </>
  )
}

export const FormTextarea = ({ onChange = () => {}, ...rest }) => {
  return (
    <>
      <Form.Control
        as={'textarea'}
        onChange={(e) => {
          onChange(e.target.value, e)
        }}
        {...rest}
      />
    </>
  )
}

export const FormSelect = ({ choices = [], valueClm = 'value', labelClm = 'label', onChange = () => {}, placeholder = null, ...rest }) => {
  return (
    <>
      <Form.Select
        onChange={(e) => {
          onChange(e.target.value, e)
        }}
        {...rest}
      >
        {placeholder && <option value={''}>{placeholder}</option>}
        {choices.map((choice, idx) => {
          return (
            <option value={choice[valueClm]} key={idx}>
              {choice[labelClm]}
            </option>
          )
        })}
      </Form.Select>
    </>
  )
}
