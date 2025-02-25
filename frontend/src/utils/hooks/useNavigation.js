import React from 'react'
import { useNavigate } from 'react-router-dom'

export const useNavigation = () => {
  const navigate = useNavigate()

  const navigateTo = (to, state = {}) => {
    navigate(to, { state: state })
  }

  return { navigateTo }
}
