import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from '@pages'
import { Layout } from '@components'

export const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
)
