import { useContext } from 'react'
import Context from '../Context'
import './Header.css'

import { useLocation, Redirect, Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'

const Header = () => {
  const [context] = useContext(Context)
  const location = useLocation()

  const isOnLoginPage = location.pathname === '/login'
  const isLoggedIn = context.user !== null

  if (!isOnLoginPage && !isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }} />
    )
  }

  console.log(location)
  console.log(context)

  return (
    <Container fluid className='navContainer'>
      <Row>
        <Col>
          <Link to="/">Home</Link>
        </Col>
        <Col md="auto"></Col>
        <Col xs="1">
          <Link to="/profile">Profile</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Header
