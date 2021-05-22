import { render, cleanup } from '@testing-library/react'
import Calendar from './Calendar'

afterEach(cleanup)

it('should display current date', () => {
  const { getByTestId } = render(<Calendar />)
  expect(getByTestId('calendar')).toHaveTextContent((new Date()).toString())
})
