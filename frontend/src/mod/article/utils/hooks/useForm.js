import React, { useRef } from 'react'
import { useNavigation } from '../../../../utils/hooks/useNavigation.js'
import { useEditItem, useRegisterItem } from '../../../../utils/hooks/useCommonUtils.js'
import { config } from '../config.js'

export const useForm = () => {
  const formRef = useRef()
  const { navigateTo } = useNavigation()
  const baseEndpoint = '/api/article/admin/'
  const formSettings = [{ formId: 'form-title', name: 'title', label: 'タイトル' }]
  const { item } = useEditItem({ baseEndpoint })
  const { isSaving, onSaving } = useRegisterItem({
    baseEndpoint: baseEndpoint,
    onSuccess: () => {
      navigateTo(`${config.path}`)
    },
  })

  return { formRef, formSettings, item, onSaving, isSaving }
}
