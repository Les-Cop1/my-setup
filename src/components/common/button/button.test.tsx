import React from 'react'

import { Button, ButtonSize, ButtonVariant } from '@components'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  test('Button should be defined', () => {
    render(<Button testid="testId" />)
    expect(screen.getByTestId('testId')).toBeInTheDocument()
  })

  test('Button should have correct variant color', () => {
    render(<Button testid="default" />)
    render(<Button testid="primary" variant={ButtonVariant.PRIMARY} />)
    render(<Button testid="success" variant={ButtonVariant.SUCCESS} />)
    render(<Button testid="secondary" variant={ButtonVariant.SECONDARY} />)
    render(<Button testid="info" variant={ButtonVariant.INFO} />)
    render(<Button testid="warning" variant={ButtonVariant.WARNING} />)
    render(<Button testid="danger" variant={ButtonVariant.DANGER} />)
    expect(screen.getByTestId('default')).toHaveClass(
      'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 focus:ring-zinc-50',
    )
    expect(screen.getByTestId('primary')).toHaveClass('bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500')
    expect(screen.getByTestId('success')).toHaveClass('bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500')
    expect(screen.getByTestId('secondary')).toHaveClass('bg-teal-100 text-teal-700 hover:bg-teal-200')
    expect(screen.getByTestId('info')).toHaveClass('bg-cyan-500 text-white hover:bg-cyan-600')
    expect(screen.getByTestId('warning')).toHaveClass('bg-amber-400 text-white hover:bg-amber-500')
    expect(screen.getByTestId('danger')).toHaveClass('bg-red-600 text-white hover:bg-red-700')
  })

  test('Button should have correct size', () => {
    render(<Button testid="default" />)
    render(<Button testid="medium" size={ButtonSize.MEDIUM} />)
    render(<Button testid="large" size={ButtonSize.LARGE} />)
    render(<Button testid="small" size={ButtonSize.SMALL} />)
    expect(screen.getByTestId('default')).toHaveClass('text-base')
    expect(screen.getByTestId('medium')).toHaveClass('text-base')
    expect(screen.getByTestId('large')).toHaveClass('text-lg')
    expect(screen.getByTestId('small')).toHaveClass('text-sm')
  })

  test('Button should have children', () => {
    render(<Button testid="testId">Button</Button>)
    expect(screen.getByTestId('testId')).toHaveTextContent('Button')
  })

  test('Button should have label', () => {
    render(<Button testid="testId" label="label" />)
    expect(screen.getByTestId('testId')).toHaveTextContent('label')
  })

  test('Button should have className', () => {
    render(<Button testid="testId" className="test-class" />)
    expect(screen.getByTestId('testId')).toHaveClass('test-class')
  })

  test('Button should have onClick', () => {
    const onClick = jest.fn()
    render(<Button testid="testId" onClick={onClick} />)
    screen.getByTestId('testId').click()
    expect(onClick).toHaveBeenCalled()
  })

  test('Button should have disabled', () => {
    render(<Button testid="testId" isDisabled />)
    expect(screen.getByTestId('testId')).toHaveAttribute('disabled')
  })

  test('Button should not have disabled', () => {
    render(<Button testid="default" />)
    render(<Button testid="notDisabled" isDisabled={false} />)
    expect(screen.getByTestId('default')).not.toHaveAttribute('disabled')
    expect(screen.getByTestId('notDisabled')).not.toHaveAttribute('disabled')
  })

  test('Button should be disabled during loading', () => {
    render(<Button testid="testId" isLoading />)
    expect(screen.getByTestId('testId')).toHaveAttribute('disabled')
  })

  test('Button should not be disabled during not loading', () => {
    render(<Button testid="testId" isLoading={false} />)
    expect(screen.getByTestId('testId')).not.toHaveAttribute('disabled')
  })

  test('Button should have correct type', () => {
    render(<Button testid="default" />)
    render(<Button testid="button" type="button" />)
    render(<Button testid="submit" type="submit" />)
    render(<Button testid="reset" type="reset" />)
    expect(screen.getByTestId('default')).toHaveAttribute('type', 'button')
    expect(screen.getByTestId('button')).toHaveAttribute('type', 'button')
    expect(screen.getByTestId('submit')).toHaveAttribute('type', 'submit')
    expect(screen.getByTestId('reset')).toHaveAttribute('type', 'reset')
  })

  test('Snapshot', () => {
    const { container } = render(<Button testid="testId" />)
    expect(container).toMatchSnapshot()
  })
})
