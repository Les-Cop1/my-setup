import React from 'react'

import { Register } from '@pages'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

describe('Register', () => {
  test('Snapshot', () => {
    const { container } = render(<Register />, { wrapper: MemoryRouter })
    expect(container).toMatchSnapshot()
  })
})
