import { useParams } from 'react-router-dom'
import { useApiExec } from './useApi.js'
import { useEffect, useState } from 'react'

export const useModel = () => {
  const { modelId } = useParams()
  const { onExec, abort } = useApiExec()
  const [modelData, setModelData] = useState({})
  const endpoint = '/api/fe/step2/1/model/' + modelId + '/edit'
  let init = false

  useEffect(() => {
    if (!init) {
      onExec({
        endpoint,
        onError: () => {},
        onSuccess: ({ data }) => {
          setModelData(data.payload.data)
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

  return { modelId, modelData }
}

export const useFindModel = () => {
  const { onExec, abort } = useApiExec()
  let init = false

  useEffect(() => {
    return () => {
      if (init) {
        abort()
      }
      init = true
    }
  }, [])

  const fetch = (params = {}) => {
    onExec({
      endpoint: '/api/fe/step2/2/model/posts',
      ...params,
    })
  }

  return { fetch }
}
