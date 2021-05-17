import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'

const LoginPage = () => {
  return (
    <Container>
      <Row className='align-items-center h-100'>
        <Col />
        <Col xs='4'>
          <Form>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type='email' placeholder='Enter username' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type='password' placeholder='Enter password' />
            </Form.Group>
            <Form.Group>
              <Button variant='primary'>Login</Button>
            </Form.Group>
          </Form>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default LoginPage
