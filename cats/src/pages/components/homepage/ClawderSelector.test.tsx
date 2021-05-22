import { render, cleanup, fireEvent, act, waitFor } from '@testing-library/react'
import ClawderSelector from './ClawderSelector'

const mockIds = [
  '1wtg', '2wtg', '3wtg'
]
const mockCats = [
  [1,'w','t','g'],
  [2,'w','t','g'],
  [3,'w','t','g'],
]

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

function mockFetch(statusCode: number) {
  return jest.spyOn(global, 'fetch').mockImplementation(endpoint => {
    if (endpoint == 'http://quantcats.herokuapp.com/bag') {
      return Promise.resolve({
          json: () => {
            return Promise.resolve({
              cats: mockCats
            })
          }
      })
    }

    return Promise.resolve({
      status: statusCode,
      json: Promise.resolve({}),
    })
  })
}

afterEach(() => {
  jest.restoreAllMocks();
});

it('it should report clawder found if API returns 200', async () => {
  mockFetch(200)

  const onClawderFound = jest.fn()
  const { findByAltText } = render(<ClawderSelector onClawderFound={onClawderFound} />)

  await act(async () => {
    fireEvent.click(await findByAltText(mockIds[0]))
    await findByAltText(mockIds[0] + 'Selected')
    await act(async () => {
      fireEvent.click(await findByAltText(mockIds[1]))
      await findByAltText(mockIds[1] + 'Selected')
      await act(async () => {
        fireEvent.click(await findByAltText(mockIds[2]))
        await findByAltText(mockIds[2] + 'Selected')
        await waitFor(() => expect(onClawderFound).toHaveBeenCalled())

        await findByAltText(mockIds[0])
        await findByAltText(mockIds[1])
        await findByAltText(mockIds[2])
      })
    })
  })
})

it('it should not report clawder found if API returns 400', async () => {
  mockFetch(400)

  const onClawderFound = jest.fn()
  const { findByAltText } = render(<ClawderSelector onClawderFound={onClawderFound} />)

  await act(async () => {
    fireEvent.click(await findByAltText(mockIds[0]))
    await findByAltText(mockIds[0] + 'Selected')
    await act(async () => {
      fireEvent.click(await findByAltText(mockIds[1]))
      await findByAltText(mockIds[1] + 'Selected')
      await act(async () => {
        fireEvent.click(await findByAltText(mockIds[2]))
        await findByAltText(mockIds[2] + 'Selected')

        await findByAltText(mockIds[0])
        await findByAltText(mockIds[1])
        await findByAltText(mockIds[2])

        expect(onClawderFound).not.toHaveBeenCalled()
      })
    })
  })
})
