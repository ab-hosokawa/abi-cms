import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

export const ListActions = ({ className = 'text-center', editSetting = {}, deleteSetting = {} }) => {
  const actionButtons = []
  if (Object.keys(editSetting).length > 0) {
    actionButtons.push({
      size: 'sm',
      variant: 'outline-primary',
      onClick: () => {},
      label: '編集',
      ...editSetting,
    })
  }
  if (Object.keys(deleteSetting).length > 0) {
    actionButtons.push({
      size: 'sm',
      variant: 'outline-danger',
      onClick: () => {},
      label: '削除',
      ...deleteSetting,
    })
  }

  return (
    <td className={className}>
      {actionButtons.length > 0 && (
        <ButtonGroup>
          {actionButtons.map((setting, key) => {
            const { label, ...rest } = setting
            return (
              <Button key={key} {...rest}>
                {label}
              </Button>
            )
          })}
        </ButtonGroup>
      )}
    </td>
  )
}
