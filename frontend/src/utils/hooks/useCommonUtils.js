import React, { useEffect, useState } from 'react'
import { useApiExec } from './useApi.js'
import { useParams } from 'react-router-dom'
import alert from 'bootstrap/js/src/alert.js'

/**
 * 一覧取得
 */
export const useFetchItems = ({
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
      fetchList()
    }

    return () => {
      if (init) {
        abort()
      }
      init = true
    }
  }, [current, pages])

  const fetchList = () => {
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

  return { current, pages, setCurrent, setPages, fetchList }
}

/**
 * 記事登録
 */
export const useRegisterItem = ({ baseEndpoint, onBefore = () => {}, onSuccess = () => {}, onError = () => {}, onAfter = () => {} }) => {
  const { id } = useParams()
  const endpoint = id ? baseEndpoint + id + '' : baseEndpoint + 'store'
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

export const useEditItem = ({ baseEndpoint, onSuccess = () => {}, onError = () => {}, defaultValue = {} }) => {
  const { id } = useParams()
  const { onExec, abort } = useApiExec()
  const [item, setItem] = useState(defaultValue)
  const endpoint = baseEndpoint + id + '/edit'
  let init = false

  useEffect(() => {
    if (id && !init) {
      onExec({
        endpoint: endpoint,
        status: 200,
        onSuccess: ({ data }) => {
          onSuccess(data)
          setItem(data.payload.data)
        },
        onError: () => {
          onError()
        },
      })
    }

    return () => {
      if (init) {
        abort()
      }
      init = true
    }
  }, [id])

  return { id, item }
}

export const useDeleteItem = ({ baseEndpoint }) => {
  const { onExec } = useApiExec()

  const confirmDelete = (id, onSuccess = () => {}) => {
    if (window.confirm('削除しますか？')) {
      const endpoint = baseEndpoint + id
      onExec({
        endpoint: endpoint,
        status: 204,
        method: 'delete',
        onSuccess: () => {
          onSuccess()
        },
      })
    }
  }

  return { confirmDelete }
}
