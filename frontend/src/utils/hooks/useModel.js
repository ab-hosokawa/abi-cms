import { useParams } from 'react-router-dom'
import { useApiExec } from './useApi.js'
import { useEffect, useState } from 'react'
import { getMockDetail, mockModel } from '../mock.js'

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
