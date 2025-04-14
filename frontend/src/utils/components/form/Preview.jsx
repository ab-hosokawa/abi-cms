import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export const Preview = forwardRef(({ config }, ref) => {
  const socketRef = useRef()
  const iframeRef = useRef()
  const [previewHtml, setPreviewHtml] = useState(null)
  let init = false
  let timer = null

  useImperativeHandle(
    ref,
    () => ({
      onChange: (inputs) => {
        setIsLoading(true)
        if (!timer) {
          timer = setTimeout(() => {
            socketRef.current?.emit('send inputs', inputs)
            timer = null
          }, 300)
        }
      },
    }),
    []
  )

  useEffect(() => {
    if (!init) {
      // socket接続
      socketRef.current = io.connect(config.socketEndpoint)

      socketRef.current.on('connect', () => {
        socketRef.current.emit('init', config.previewUrl)
      })

      // プレビュー
      socketRef.current.on('preview', (data) => {
        console.log(data)
        setPreviewHtml(data)
      })
    }

    return () => {
      if (init) {
        socketRef.current.disconnect()
      }
      init = true
    }
  }, [])

  return (
    <>
      {(() => {
        if (!previewHtml) {
          return 'プレビュー準備中'
        } else if (previewHtml === false) {
          return 'プレビューが取得できませんでした'
        } else {
          return (
            <>
              <iframe style={{ width: '100%', height: '80vh' }} srcDoc={'<html id="preview"></html>'} ref={iframeRef} />
            </>
          )
        }
      })()}
    </>
  )
})
