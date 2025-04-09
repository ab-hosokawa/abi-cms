import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApiExec } from './useApi.js'

export const useField = () => {
  const { modelId } = useParams()
  const { onExec, abort } = useApiExec()
  const [fields, setFields] = useState([])
  const endpoint = '/api/fe/step2/1/' + modelId + '/field'
  let init = false

  useEffect(() => {
    if (!init) {
      onExec({
        endpoint,
        onError: () => {},
        onSuccess: ({ data }) => {
          setFields(data.payload.data)
        },
      })
    }

    return () => {
      if (init) {
        abort()
      }
      init = true
    }
  }, [modelId])

  return { fields }
}

export const useFindField = () => {
  const { onExec, abort } = useApiExec()

  const findAll = () => {}

  const findByModel = (modelId, params = {}) => {
    onExec({
      endpoint: '/api/fe/step2/1/' + modelId + '/field',
      ...params,
    })
  }

  return { findByModel }
}
