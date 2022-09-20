import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Account, Overview, Room, Unknown, Login, Register } from '@pages'
import { SetupLayout, Layout } from '@components'

export const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="account" element={<Account />} />
      <Route path="setup" element={<SetupLayout />}>
        <Route index element={<Overview />} />
        <Route path="room/:_id" element={<Room />} />
        <Route path="*" element={<Unknown />} />
      </Route>
      <Route path="*" element={<Unknown />} />
    </Route>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Routes>
)
