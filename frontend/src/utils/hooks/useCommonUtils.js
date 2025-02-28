import React, { useEffect, useState } from 'react'
import { useApiExec } from './useApi.js'
import { useParams } from 'react-router-dom'

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
  const [current, setCurrent] = useState(1)
  const [pages, setPages] = useState(null)
  const [limit, setLimit] = useState(null)

  useEffect(() => {
    if (!init) {
      onExec({
        endpoint,
        method,
        params: { current: current, limit: limit, ...params },
        headers,
        status,
        onBefore,
        onSuccess: (res) => {
          setCurrent(res.data.payload.current)
          setPages(res.data.payload.pages)
          onSuccess(res)
        },
        onError,
        onAfter,
      })
    }

    return () => {
      if (init) {
        abort()
      }
      init = true
    }
  }, [current, pages])

  return { current, pages, setCurrent, setPages }
}

/**
 * 記事登録
 */
export const useRegisterItem = ({
  baseEndpoint,
  onBefore = () => {},
  onSuccess = () => {},
  onError = () => {
    alert('入力エラーがあります')
  },
  onAfter = () => {},
}) => {
  const { id } = useParams()
  const endpoint = id ? baseEndpoint + id + '/update' : baseEndpoint + 'store'
  const method = id ? 'put' : 'post'
  const status = id ? 204 : 201
  const { onExec } = useApiExec()
  const [isSaving, setIsSaving] = useState(false)

  const onSaving = (inputs) => {
    onExec({
      endpoint: endpoint,
      method: method,
      status: status,
      params: inputs,
      onBefore: () => {
        setIsSaving(true)
        onBefore()
      },
      onSuccess: () => {
        onSuccess()
      },
      onError: () => {
        onError()
      },
      onAfter: () => {
        setIsSaving(false)
        onAfter()
      },
    })
  }

  return { id, isSaving, onSaving }
}
