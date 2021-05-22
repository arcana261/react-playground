import { render, cleanup, fireEvent } from '@testing-library/react'
import CatTile from './CatTile'

beforeEach(cleanup)

const cat = {
  id: '1wtg',
  stripes: 1,
  color: 'w',
  shape: 't',
  eyes: 'g',
  selected: false,
}

it('should render cat', () => {
  const { getByAltText } = render(<CatTile cat={cat} />)
  expect(getByAltText(cat.id)).toHaveAttribute('src', expect.stringContaining(cat.id))
})

it('should have default width', () => {
  const { getByAltText } = render(<CatTile cat={cat} />)
  expect(getByAltText(cat.id)).toHaveAttribute('width')
})

it('should have default height', () => {
  const { getByAltText } = render(<CatTile cat={cat} />)
  expect(getByAltText(cat.id)).toHaveAttribute('height')
})

it('should have default class', () => {
  const { getByAltText } = render(<CatTile cat={cat} />)
  expect(getByAltText(cat.id)).toHaveClass('catTile')
  expect(getByAltText(cat.id)).not.toHaveClass('catTileSelected')
})

it('should fire callback on click', () => {
  const onClick = jest.fn()
  const { getByAltText } = render(<CatTile cat={cat} onClick={onClick} />)
  fireEvent.click(getByAltText(cat.id))
  expect(onClick).toHaveBeenCalled()
})

it('should have selectedClass when cat is selected', () => {
  const selectedCat = {
    ...cat,
    selected: true
  }

  const { getByAltText } = render(<CatTile cat={selectedCat} />)
  expect(getByAltText(cat.id + 'Selected')).toHaveClass('catTile')
  expect(getByAltText(cat.id + 'Selected')).toHaveClass('catTileSelected')
})

it('should have width', () => {
  const { getByAltText } = render(<CatTile cat={cat} width={16} />)
  expect(getByAltText(cat.id)).toHaveAttribute('width', '16')
})

it('should have height', () => {
  const { getByAltText } = render(<CatTile cat={cat} height={16} />)
  expect(getByAltText(cat.id)).toHaveAttribute('height', '16')
})
