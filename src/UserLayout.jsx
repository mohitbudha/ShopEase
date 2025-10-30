
import React from 'react'
import LandingPage from './commponent/LandingPage'

const UserLayout = ({children}) => {
  return (
    <div>
      <LandingPage/>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}

export default UserLayout
