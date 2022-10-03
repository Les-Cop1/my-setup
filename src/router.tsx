import React from 'react'

import { Layout } from '@components'
import { Account, Login, NotFound, Register } from '@pages'

import { Route, Routes } from 'react-router-dom'

export const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="user" element={<Account />} />
      <Route index element={<p>toto</p>} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
)
