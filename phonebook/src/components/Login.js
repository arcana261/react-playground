import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'

import PropTypes from 'prop-types'
import { useEffect } from 'React'

const Login = ({onLogin}) => {
  const loginClicked = () => {
    console.log('hey')
    useEffect(() => {
      username = document.querySelector('#email').value
      password = document.querySelector('#password').value
      onLogin(username, password)
    })
  }

  return (
    <Container>
      <Row className='align-items-center h-100'>
        <Col />
        <Col xs='4'>
          <Form>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type='email' id='email' placeholder='Enter username' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type='password' id='password' placeholder='Enter password' />
            </Form.Group>
            <Form.Group>
              /*<Button variant='primary' onClick={loginClicked.bind(this)} onChange={loginClicked.bind(this)}>Login</Button>*/
              <button className='btn btn-primary' onClick={loginClicked}>Login</button>
            </Form.Group>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

Login.defaultProps = {
  onLogin: (u, p) => console.log(u, p)
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default Login
