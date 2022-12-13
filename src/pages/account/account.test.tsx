import React from 'react'

import { Account } from '@pages'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

describe('Account', () => {
  test('Snapshot', () => {
    const { container } = render(<Account />)
    expect(container).toMatchSnapshot()
  })
})
