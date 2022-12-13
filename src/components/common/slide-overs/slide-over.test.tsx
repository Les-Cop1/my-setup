import React from 'react'

import { SlideOver } from '@components'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

describe('Slide over', () => {
  test('Snapshot', () => {
    const { container } = render(
      <SlideOver isOpen onClose={jest.fn()} title="title">
        Hello World
      </SlideOver>,
    )
    expect(container).toMatchSnapshot()
  })
})
