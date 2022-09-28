import React from 'react'

import { Layout } from '@components'
import { NotFound } from '@pages'

import { Route, Routes } from 'react-router-dom'

export const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<p>toto</p>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
)
