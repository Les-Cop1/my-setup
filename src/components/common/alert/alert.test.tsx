import React from 'react'

import { Alert } from '@components'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Alert', () => {
  test('Alert should be defined', () => {
    render(<Alert testid="testId" message="message" />)
    expect(screen.getByTestId('testId')).toBeInTheDocument()
  })

  test('Alert should have correct type color', () => {
    render(<Alert testid="default" message="default" />)
    render(<Alert testid="error" message="error" type="error" />)
    render(<Alert testid="success" message="success" type="success" />)
    render(<Alert testid="info" message="info" type="info" />)
    expect(screen.getByTestId('default')).toHaveClass('bg-red-50')
    expect(screen.getByText('default')).toHaveClass('text-red-800')
    expect(screen.getByTestId('error')).toHaveClass('bg-red-50')
    expect(screen.getByText('error')).toHaveClass('text-red-800')
    expect(screen.getByTestId('success')).toHaveClass('bg-teal-50')
    expect(screen.getByText('success')).toHaveClass('text-teal-800')
    expect(screen.getByTestId('info')).toHaveClass('bg-cyan-50')
    expect(screen.getByText('info')).toHaveClass('text-cyan-800')
  })

  test('Alert should have className', () => {
    render(<Alert testid="testId" message="message" className="test-class" />)
    expect(screen.getByTestId('testId')).toHaveClass('test-class')
  })

  test('Alert should contain text', () => {
    render(<Alert testid="testId" message="hello world" className="test-class" />)
    expect(screen.getByText('hello world')).toBeInTheDocument()
  })

  test('Snapshot', () => {
    const { container } = render(<Alert testid="testId" message="message" />)
    expect(container).toMatchSnapshot()
  })
})
