import App from '../App.jsx'

// step1_2
import { Index as Step1_2_Index } from '../pages/step1_2/Index.jsx'
import { New as Step1_2_New } from '../pages/step1_2/New.jsx'

// step1_3
import { Index as Step1_3_Index } from '../pages/step1_3/Index.jsx'
import { Form as Step1_3_Form } from '../pages/step1_3/Form.jsx'

export const routes = [
  { path: '/', element: App, name: 'Top', menu: true },
  // step1_2
  { path: '/step1_2/', element: Step1_2_Index, name: 'Step1-2', menu: true },
  { path: '/step1_2/new/', element: Step1_2_New, name: 'Step1-2', menu: false },
  // step1_3
  { path: '/step1_3/', element: Step1_3_Index, name: 'Step1-3', menu: true },
  { path: '/step1_3/new/', element: Step1_3_Form, name: 'Step1-3', menu: false },
  { path: '/step1_3/:id/', element: Step1_3_Form, name: 'Step1-3', menu: false },
]
