import React from 'react'

import { Text, TextVariant } from '@components'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Text', () => {
  test('Text should be defined', () => {
    render(<Text testid="testId" />)
    expect(screen.getByTestId('testId')).toBeInTheDocument()
  })

  test('Text should have correct decorator', () => {
    render(<Text testid="default" />)
    render(<Text testid="underline" isUnderline />)
    render(<Text testid="bold" isBold />)
    render(<Text testid="italic" isItalic />)
    render(<Text testid="indent" isIndent />)

    expect(screen.getByTestId('default')).not.toHaveClass('underline', 'font-bold', 'italic', 'indent-8')
    expect(screen.getByTestId('underline')).toHaveClass('underline')
    expect(screen.getByTestId('bold')).toHaveClass('font-bold')
    expect(screen.getByTestId('italic')).toHaveClass('italic')
    expect(screen.getByTestId('indent')).toHaveClass('indent-8')
  })

  test('Text should loading', () => {
    render(<Text testid="default" />)
    render(<Text testid="notLoading" isLoading={false} />)
    render(<Text testid="loading" isLoading={true} />)

    expect(screen.getByTestId('default')).not.toHaveClass(
      'w-fit animate-pulse bg-slate-700 rounded-full text-transparent',
    )
    expect(screen.getByTestId('notLoading')).not.toHaveClass(
      'w-fit animate-pulse bg-slate-700 rounded-full text-transparent',
    )
    expect(screen.getByTestId('loading')).toHaveClass('w-fit animate-pulse bg-slate-700 rounded-full text-transparent')
  })

  test('Text should have correct variant color', () => {
    render(<Text testid="default" />)
    render(<Text testid="primary" variant={TextVariant.PRIMARY} />)
    render(<Text testid="secondary" variant={TextVariant.SECONDARY} />)
    render(<Text testid="info" variant={TextVariant.INFO} />)
    render(<Text testid="warning" variant={TextVariant.WARNING} />)
    render(<Text testid="success" variant={TextVariant.SUCCESS} />)
    render(<Text testid="danger" variant={TextVariant.DANGER} />)
    render(<Text testid="dark_grey" variant={TextVariant.DARK_GREY} />)
    render(<Text testid="grey" variant={TextVariant.GREY} />)
    render(<Text testid="light_grey" variant={TextVariant.LIGHT_GREY} />)
    render(<Text testid="black" variant={TextVariant.BLACK} />)
    render(<Text testid="white" variant={TextVariant.WHITE} />)

    expect(screen.getByTestId('primary')).toHaveClass('text-teal-500')
    expect(screen.getByTestId('success')).toHaveClass('text-teal-500')
    expect(screen.getByTestId('secondary')).toHaveClass('text-amber-400')
    expect(screen.getByTestId('warning')).toHaveClass('text-amber-400')
    expect(screen.getByTestId('info')).toHaveClass('text-cyan-500')
    expect(screen.getByTestId('danger')).toHaveClass('text-red-600')
    expect(screen.getByTestId('dark_grey')).toHaveClass('text-slate-800')
    expect(screen.getByTestId('grey')).toHaveClass('text-slate-500')
    expect(screen.getByTestId('light_grey')).toHaveClass('text-slate-50')
    expect(screen.getByTestId('white')).toHaveClass('text-white')
    expect(screen.getByTestId('black')).toHaveClass('text-black')
  })

  test('text should have correct alignement', () => {
    render(<Text testid="default" />)
    render(<Text testid="left" textAlignment={'left'} />)
    render(<Text testid="right" textAlignment={'right'} />)
    render(<Text testid="center" textAlignment={'center'} />)
    render(<Text testid="justify" textAlignment={'justify'} />)
    expect(screen.getByTestId('default')).toHaveClass('text-left')
    expect(screen.getByTestId('left')).toHaveClass('text-left')
    expect(screen.getByTestId('right')).toHaveClass('text-right')
    expect(screen.getByTestId('center')).toHaveClass('text-center')
    expect(screen.getByTestId('justify')).toHaveClass('text-justify')
  })

  test('Text should have children', () => {
    render(<Text testid="testId">Text</Text>)
    expect(screen.getByTestId('testId')).toHaveTextContent('Text')
  })

  test('Text should have text', () => {
    render(<Text testid="testId" text="Hello world" />)
    expect(screen.getByTestId('testId')).toHaveTextContent('Hello world')
  })

  test('Text should have className', () => {
    render(<Text testid="testId" className="test-class" />)
    expect(screen.getByTestId('testId')).toHaveClass('test-class')
  })

  test('Text should have head class', () => {
    render(<Text testid="default" />)
    render(<Text testid="h1" as="h1" />)
    render(<Text testid="h2" as="h2" />)
    render(<Text testid="h3" as="h3" />)
    render(<Text testid="h4" as="h4" />)
    expect(screen.getByTestId('default')).toHaveClass('text-base')
    expect(screen.getByTestId('h1')).toHaveClass('text-6xl')
    expect(screen.getByTestId('h2')).toHaveClass('text-5xl')
    expect(screen.getByTestId('h3')).toHaveClass('text-4xl')
    expect(screen.getByTestId('h4')).toHaveClass('text-3xl')
  })

  test('Text should is headline', () => {
    render(<Text testid="h1" as="h1" isHeadline />)
    render(<Text testid="h2" as="h2" isHeadline />)
    render(<Text testid="h3" as="h3" isHeadline />)
    expect(screen.getByTestId('h1')).toHaveClass('mb-10')
    expect(screen.getByTestId('h2')).toHaveClass('mb-8')
    expect(screen.getByTestId('h3')).toHaveClass('mb-6')
  })

  test('Snapshot', () => {
    const { container } = render(<Text testid="testId" />)
    expect(container).toMatchSnapshot()
  })
})
