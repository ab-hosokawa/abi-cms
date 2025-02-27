import axios from 'axios'

/**
 * API Hook
 */
export const useApi = () => {
  const controller = new AbortController()

  const init = () => {
    let apiClient = axios.create({
      withCredentials: true,
      headers: {
        'Content-type': 'application/json',
      },
    })

    return apiClient
  }

  const get = ({ endpoint, params = {}, headers = {} } = {}) => {
    const apiClient = init()
    return apiClient
      .get(endpoint, { params: params, headers: headers, signal: controller.signal })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err.response
      })
  }

  const post = ({ endpoint, params = {}, headers = {} } = {}) => {
    const apiClient = init()
    return apiClient
      .post(endpoint, params, { headers: headers, signal: controller.signal })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err.response
      })
  }

  const put = ({ endpoint, params = {}, headers = {} } = {}) => {
    const apiClient = init()
    return apiClient
      .put(endpoint, params, { headers: headers, signal: controller.signal })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err.response
      })
  }

  const remove = ({ endpoint, params = {}, headers = {} } = {}) => {
    const apiClient = init()
    return apiClient
      .delete(endpoint, { params: params, headers: headers, signal: controller.signal })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err.response
      })
  }

  const abort = () => {
    controller.abort()
  }

  return { get, post, put, remove, abort }
}

export const useApiExec = () => {
  const api = useApi()

  /**
   * API実行
   */
  const onExec = async ({
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
    if (onBefore) {
      onBefore()
    }

    const f = () => {
      return new Promise((resolve) => {
        let res = null
        switch (method.toLowerCase()) {
          case 'post':
            res = api.post({ endpoint, params, headers })
            break
          case 'put':
            res = api.put({ endpoint, params, headers })
            break
          case 'delete':
            res = api.remove({ endpoint, params, headers })
            break
          default:
            res = api.get({ endpoint, params, headers })
        }

        resolve(res)
      })
    }

    // API実行
    const res = await f()
    if (res) {
      try {
        if (res.status === status) {
          if (onSuccess) {
            onSuccess(res)
          }
        } else {
          throw new Error('status failed')
        }
      } catch (e) {
        console.error(e)
        if (onError) {
          onError(res, e)
        }
      }
    }
    if (onAfter) {
      onAfter()
    }
  }

  const abort = () => {
    api.abort()
  }

  return { onExec, abort }
}
