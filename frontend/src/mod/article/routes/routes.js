import React from 'react'

import { config } from '../utils/config.js'
import { Index } from '../pages/Index.jsx'
import { New } from '../pages/New.jsx'
import { Edit } from '../pages/Edit.jsx'

export const routes = [
  {
    name: config.name,
    path: `${config.path}`,
    element: Index,
    menu: true,
  },
  {
    path: `${config.path}/new`,
    element: New,
  },
  {
    path: `${config.path}/edit/:id`,
    element: Edit,
  },
]
