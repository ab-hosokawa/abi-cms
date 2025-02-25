import App from '../App.jsx'
import { Index as Step1_2_Index } from '../pages/step1_2/Index.jsx'
import { New as Step1_2_New } from '../pages/step1_2/New.jsx'

export const routes = [
  { path: '/', element: App, name: 'Top', menu: true },
  // step1_2
  { path: '/step1_2/', element: Step1_2_Index, name: 'Step1-2', menu: true },
  { path: '/step1_2/new/', element: Step1_2_New, name: 'Step1-2', menu: false },
]
