import React from 'react'

import { AuthLayout, Layout } from '@components'
import { Account, Home, Login, NotFound, Overview, Register, Room } from '@pages'

import { Route, Routes } from 'react-router-dom'

export const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="user" element={<Account />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="setup" element={<AuthLayout />}>
      <Route index element={<Overview />} />
      <Route path="room/:_id" element={<Room />} />
    </Route>
  </Routes>
)
