import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap'

import PropTypes from 'prop-types'
import { useState } from 'react'

import sleep from '../utils/sleep'

const Login = ({onLogin}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [validated, setValidated] = useState(false)

  const loginClicked = (e) => {
    const form = e.currentTarget

    e.preventDefault()
    console.log('h1')

    if (form.checkValidity() === false) {
      setValidated(true)
      console.log('h2')
      e.stopPropagation()
      return
    }
    setValidated(false)
    console.log('h3')

    const username = document.querySelector('#email')
    const password = document.querySelector('#password')

    setIsLoggingIn(true)
    onLogin(username.value, password.value)
      .finally(() => setIsLoggingIn(false))
  }

  return (
    <Container>
      <Row>
        <Col />
        <Col xs='6'>
          <Form noValidate validated={validated} onSubmit={loginClicked} >
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type='email' id='email' placeholder='Enter username' required disabled={isLoggingIn}/>
              <Form.Control.Feedback type='invalid'>
                Please enter a valid username
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type='password' id='password' placeholder='Enter password' disabled={isLoggingIn}/>
              <Form.Control.Feedback type='invalid'>
                Please enter a valid password
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Button variant='primary' disabled={isLoggingIn} type='submit'>Login</Button>
            </Form.Group>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

Login.defaultProps = {
  onLogin: async (u, p) => {
    await sleep(1000)
    console.log(u, p)
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default Login
