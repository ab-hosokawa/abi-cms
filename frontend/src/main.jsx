import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const routes = [{ path: '/', element: App }]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        {routes.map((route, key) => {
          console.log(route)
          return <Route path={route.path} element={<route.element />} key={key} />
        })}
        <Route path={'/'} element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
