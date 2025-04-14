import App from '../App.jsx'

// step1_2
import { Index as Step1_2_Index } from '../pages/step1_2/Index.jsx'
import { New as Step1_2_New } from '../pages/step1_2/New.jsx'

// step1_3
import { Index as Step1_3_Index } from '../pages/step1_3/Index.jsx'
import { Form as Step1_3_Form } from '../pages/step1_3/Form.jsx'

// step2_1
import { Index as Step2_1_Index } from '../pages/step2_1/Index.jsx'
import { Form as Step2_1_Form } from '../pages/step2_1/Form.jsx'
import { Index as Step2_1_Field_Index } from '../pages/step2_1/field/Index.jsx'
import { Form as Step2_1_Field_Form } from '../pages/step2_1/field/Form.jsx'

// step2_2
import { Index as Step2_2_Index } from '../pages/step2_2/Index.jsx'
import { Form as Step2_2_Form } from '../pages/step2_2/Form.jsx'

// step2_3
import { Form as Step2_3_Form } from '../pages/step2_3/Form.jsx'

export const routes = [
  { path: '/', element: App, name: 'Top', menu: true },
  // step1_2
  { path: '/step1_2/', element: Step1_2_Index, name: 'Step1-2', menu: true },
  { path: '/step1_2/new/', element: Step1_2_New, name: 'Step1-2', menu: false },
  // step1_3
  { path: '/step1_3/', element: Step1_3_Index, name: 'Step1-3', menu: true },
  { path: '/step1_3/new/', element: Step1_3_Form, name: 'Step1-3', menu: false },
  { path: '/step1_3/:id/', element: Step1_3_Form, name: 'Step1-3', menu: false },
  // step2_1
  { path: '/step2_1/', element: Step2_1_Index, name: 'Step2-1', menu: true },
  { path: '/step2_1/new/', element: Step2_1_Form, name: 'Step2-1', menu: false },
  { path: '/step2_1/:id/', element: Step2_1_Form, name: 'Step2-1', menu: false },
  { path: '/step2_1/:modelId/field/', element: Step2_1_Field_Index, name: 'Step2-1', menu: false },
  { path: '/step2_1/:modelId/field/new/', element: Step2_1_Field_Form, name: 'Step2-1', menu: false },
  { path: '/step2_1/:modelId/field/:id/', element: Step2_1_Field_Form, name: 'Step2-1', menu: false },
  // step2_2
  { path: '/step2_2/', element: Step2_2_Index, name: 'Step2-2', menu: true },
  { path: '/step2_2/new/', element: Step2_2_Form, name: 'Step2-2', menu: false },
  { path: '/step2_2/:id/', element: Step2_2_Form, name: 'Step2-2', menu: false },
  // step2_3
  { path: '/step2_3/', element: Step2_3_Form, name: 'Step2-3', menu: true },
]
