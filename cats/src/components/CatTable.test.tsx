import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import CatTable from './CatTable'

const cat1 = {
  id: '1wtg',
  stripes: 1,
  color: 'w',
  shape: 't',
  eyes: 'g',
  selected: false,
}

const cat2 = {
  id: '2wtg',
  stripes: 2,
  color: 'w',
  shape: 't',
  eyes: 'g',
  selected: false,
}

const cats = [cat1, cat2]

beforeEach(() => {
  cleanup()
  Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
})

it('should render all cats', () => {
  const { getByAltText } = render(<CatTable cats={cats} />)
  expect(getByAltText(cat1.id)).toHaveAttribute('src', expect.stringContaining(cat1.id))
  expect(getByAltText(cat2.id)).toHaveAttribute('src', expect.stringContaining(cat2.id))
})

it('should render in columns', () => {
  render(<CatTable columns={2} cats={cats} />)

  const catTable = document.querySelector('.catTable')
  const rows = catTable.querySelectorAll('.ant-row')
  expect(rows.length).toBe(1)
  const columns = rows[0].querySelectorAll('.ant-col')
  expect(columns.length).toBe(2)
  expect(columns[0].querySelectorAll('.catTile').length).toBe(1)
  expect(columns[1].querySelectorAll('.catTile').length).toBe(1)
})

it('should render in rows', () => {
  render(<CatTable columns={1} cats={cats} />)

  const catTable = document.querySelector('.catTable')
  const rows = catTable.querySelectorAll('.ant-row')
  expect(rows.length).toBe(2)
  expect(rows[0].querySelectorAll('.catTile').length).toBe(1)
  expect(rows[1].querySelectorAll('.catTile').length).toBe(1)
})

it('should render with tileWidth', () => {
  const { getByAltText } = render(<CatTable cats={cats} tileWidth={10} />)
  const cat = getByAltText(cats[0].id)
  expect(cat).toHaveAttribute('width', '10')
})

it('should render with tileHeight', () => {
  const { getByAltText } = render(<CatTable cats={cats} tileHeight={10} />)
  const cat = getByAltText(cats[0].id)
  expect(cat).toHaveAttribute('height', '10')
})

it('should fire onClick', () => {
  const onClick = jest.fn()
  const { getByAltText } = render(<CatTable cats={cats} onClick={onClick} />)
  const cat = getByAltText(cats[0].id)
  fireEvent.click(cat)
  expect(onClick).toHaveBeenCalled()
})
