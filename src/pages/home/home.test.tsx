import React from 'react'

import { Home } from '@pages'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

describe('Home', () => {
  test('Snapshot', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
