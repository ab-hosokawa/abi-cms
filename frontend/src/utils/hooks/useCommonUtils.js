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
  isUseEffect = true,
} = {}) => {
  let init = false
  const { onExec, abort } = useApiExec()
  const [current, setCurrent] = useState(1)
  const [pages, setPages] = useState(null)
  const [limit, setLimit] = useState(null)

  useEffect(() => {
    if (!init && isUseEffect) {
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
export const useRegisterItem = ({
  baseEndpoint,
  onBefore = () => {},
  onSuccess = () => {},
  onError = () => {},
  onAfter = () => {},
  updatePath = '',
}) => {
  const { id } = useParams()
  const endpoint = id ? baseEndpoint + 'update/' + id + updatePath : baseEndpoint + 'store'
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

export const useEditItem = ({ baseEndpoint, onSuccess = () => {}, onError = () => {}, defaultValue = {}, isUseEffect = true }) => {
  const { id } = useParams()
  const { onExec, abort } = useApiExec()
  const [item, setItem] = useState(defaultValue)
  const endpoint = baseEndpoint + 'detail/' + id
  const [isLoad, setIsLoad] = useState(typeof id === 'undefined')
  let init = false

  useEffect(() => {
    if (id && isUseEffect && !init) {
      findItem()
    }

    return () => {
      if (init) {
        abort()
      }
      init = true
    }
  }, [id])

  const findItem = (callback = null) => {
    onExec({
      endpoint: endpoint,
      status: 200,
      onBefore: () => {
        setIsLoad(false)
      },
      onSuccess: ({ data }) => {
        onSuccess(data)
        setItem(data.payload.data)
        if (callback) {
          callback(data)
        }
      },
      onError: () => {
        onError()
      },
      onAfter: () => {
        setIsLoad(true)
      },
    })
  }

  return { id, item, isLoad, findItem }
}

export const useDeleteItem = ({ baseEndpoint, deletePath = '' }) => {
  const { onExec } = useApiExec()

  const confirmDelete = (id, onSuccess = () => {}) => {
    if (window.confirm('削除しますか？')) {
      const endpoint = baseEndpoint + id + deletePath
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
