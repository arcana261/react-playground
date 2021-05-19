import './Header.css'

import Calendar from './Calendar'

interface Props {
}

function Header(props: Props) {
  return (
    <div className="header">
      <strong>Catrancher</strong>
      <Calendar />
    </div>
  )
}

export default Header
