interface Props {
}

function Calendar(props: Props) {
  const today  = new Date();

  const msg = today.toString()

  return (
    <strong data-testid="calendar" className='calendar'>{msg}</strong>
  )
}

export default Calendar
