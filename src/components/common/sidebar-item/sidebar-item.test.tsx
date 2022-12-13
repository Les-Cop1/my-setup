import React from 'react'

import { SidebarItem } from '@components'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

describe('Sidebar item', () => {
  test('Snapshot', () => {
    const { container } = render(<SidebarItem label="Hello" to="/world" />, { wrapper: MemoryRouter })
    expect(container).toMatchSnapshot()
  })
})
