import React from 'react'

import { Sidebar } from '@components'

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex flex-col bg-zinc-50 min-h-screen">
      <Sidebar />
    </div>
  )
}
