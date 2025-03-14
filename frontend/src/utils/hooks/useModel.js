import { useParams } from 'react-router-dom'
import { useApiExec } from './useApi.js'
import { useEffect, useState } from 'react'
import { getMockDetail, mockModel } from '../mock.js'

export const useModel = () => {
  const { modelId } = useParams()
  const { onExec, abort } = useApiExec()
  const [modelData, setModelData] = useState({})
  const endpoint = '/api/'
  let init = false

  useEffect(() => {
    if (!init) {
      onExec({
        endpoint,
        onError: () => {},
        onAfter: () => {
          setModelData(getMockDetail(modelId, mockModel))
        },
      })
    }

    return () => {
      if (!init) {
        abort()
      }
      init = true
    }
  }, [modelId])

  return { modelId, modelData }
}
