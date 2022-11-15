import React from 'react'

import { Login } from '@pages'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

describe('Login', () => {
  test('Snapshot', () => {
    const { container } = render(<Login />, { wrapper: MemoryRouter })
    expect(container).toMatchSnapshot()
  })
})
