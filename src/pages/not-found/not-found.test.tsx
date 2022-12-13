import React from 'react'

import { NotFound } from '@pages'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

describe('Not found', () => {
  test('Snapshot', () => {
    const { container } = render(<NotFound />)
    expect(container).toMatchSnapshot()
  })
})
