import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { PageHeaderMeta } from './page-header-meta'

describe('Page Header Meta', () => {
  test('PageHeaderMeta should have correct background color', () => {
    render(<PageHeaderMeta label="default" testid="default" />)
    render(<PageHeaderMeta label="light" testid="light" backgroundColor="light" />)
    render(<PageHeaderMeta label="white" testid="white" backgroundColor="white" />)
    render(<PageHeaderMeta label="dark" testid="dark" backgroundColor="dark" />)
    expect(screen.getByTestId('default')).toHaveClass('text-slate-500')
    expect(screen.getByTestId('light')).toHaveClass('text-slate-500')
    expect(screen.getByTestId('white')).toHaveClass('text-slate-500')
    expect(screen.getByTestId('dark')).toHaveClass('text-zinc-200')
  })

  test('PageHeaderMeta should have label', () => {
    render(<PageHeaderMeta label="label" testid="default" />)
    expect(screen.getByText('label')).toBeInTheDocument()
  })

  test('Snapshot', () => {
    const { container } = render(<PageHeaderMeta label="Hello" />)
    expect(container).toMatchSnapshot()
  })
})
