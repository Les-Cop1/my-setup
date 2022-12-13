import React from 'react'

import { PageHeader } from '@components'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Page Header', () => {
  test('PageHeader should have correct background color', () => {
    render(<PageHeader title="default" testid="default" />)
    render(<PageHeader title="white" testid="white" backgroundColor="white" />)
    render(<PageHeader title="light" testid="light" backgroundColor="light" />)
    render(<PageHeader title="dark" testid="dark" backgroundColor="dark" />)
    expect(screen.getByTestId('default')).toHaveClass('bg-white')
    expect(screen.getByText('default')).toHaveClass('text-slate-900')
    expect(screen.getByTestId('white')).toHaveClass('bg-white')
    expect(screen.getByText('white')).toHaveClass('text-slate-900')
    expect(screen.getByTestId('light')).toHaveClass('bg-zinc-50')
    expect(screen.getByText('light')).toHaveClass('text-slate-900')
    expect(screen.getByTestId('dark')).toHaveClass('bg-zinc-800')
    expect(screen.getByText('dark')).toHaveClass('text-white ')
  })

  test('PageHeader should have title', () => {
    render(<PageHeader title="title" testid="default" />)
    expect(screen.getByText('title')).toBeInTheDocument()
  })

  test('Button should have className', () => {
    render(<PageHeader title="title" testid="testId" className="test-class" />)
    expect(screen.getByTestId('testId')).toHaveClass('test-class')
  })

  test('Snapshot', () => {
    const { container } = render(<PageHeader title="Hello" />)
    expect(container).toMatchSnapshot()
  })
})
