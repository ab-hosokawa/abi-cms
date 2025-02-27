import React, { useEffect } from 'react'
import { useApiExec } from './useApi.js'

/**
 * 一覧取得
 */
export const useGetFetch = ({
  endpoint,
  method = 'get',
  params = {},
  headers = {},
  status = 200,
  onBefore = null,
  onSuccess = null,
  onError = null,
  onAfter = null,
} = {}) => {
  let init = false
  const { onExec, abort } = useApiExec()

  useEffect(() => {
    if (!init) {
      onExec({ endpoint, method, params, headers, status, onBefore, onSuccess, onError, onAfter })
    }

    return () => {
      if (init) {
        abort()
      }
      init = true
    }
  }, [])
}
