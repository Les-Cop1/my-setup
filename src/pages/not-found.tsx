import React from 'react'
import { ReactComponent as NotFoundImage } from '@assets/images/not_found.svg'

export const NotFound = () => {
  document.title = 'Not Found - mySETUP'

  return (
    <div
      style={{
        margin: 'auto',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <NotFoundImage />
    </div>
  )
}
