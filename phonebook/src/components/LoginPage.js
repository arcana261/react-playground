import {
  Row,
  Col,
  Container,
  Toast
} from 'react-bootstrap'

import { useState } from 'react'

import Login from './Login'

const LoginPage = () => {
  const [showError, setShowError] = useState(false)

  const onLogin = async (username, password) => {
    console.log('from login page', username, password)
    setShowError(true)
  }

  return (
    <Container>
      <Row>
        <Col>
          <div style={{position: 'relative', minHeight: '200px'}}>
            <div style={{position: 'absolute', top: 0, right: 0}}>
              <Toast show={showError} onClose={() => setShowError(false)} delay={3000} autohide>
                <Toast.Header>
                  <small>Login</small>
                </Toast.Header>
                <Toast.Body>
                  Some error occured
                </Toast.Body>
              </Toast>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Login onLogin={onLogin}/>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
