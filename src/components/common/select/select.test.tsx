import React from 'react'

import { Select } from '@components'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('select', () => {
  test('Select should be defined', () => {
    render(<Select testid="testId" placeholder="test" />)
    expect(screen.getByTestId('testId')).toBeInTheDocument()
  })
})
