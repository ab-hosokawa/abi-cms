import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { routes } from './routes/routes.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar bg={'dark'} variant={'dark'} expand={'lg'}>
      <Navbar.Brand>abi-CMS</Navbar.Brand>
    </Navbar>
    <Container fluid>
      <Row>
        <Col xs={2} className={'bg-light vh-100'}>
          <Nav className={'flex-column p-3'}>
            {routes.map((route, key) => {
              if (route.menu) {
                return (
                  <Nav.Link href={'/#' + route.path} key={key}>
                    {route.name}
                  </Nav.Link>
                )
              }
            })}
          </Nav>
        </Col>
        <Col xs={10} className="p-4">
          <HashRouter>
            <Routes>
              {routes.map((route, key) => {
                return <Route path={route.path} element={<route.element />} key={key} />
              })}
              <Route path={'/'} element={<App />} />
            </Routes>
          </HashRouter>
        </Col>
      </Row>
    </Container>
  </StrictMode>
)
