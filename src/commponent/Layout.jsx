import React from 'react'
import Navbar from './Header&Footer/Navbar'
import Footer from './Header&Footer/Footer'

const Layout = ({children, setSearchTerm,setCategory}) => {
  return (
    <div>
      <Navbar onSearch={setSearchTerm} onCategoryChange={setCategory}/>
      <main className="flex-1 p-4">{children}</main>
      <Footer/>
    </div>
  )
}

export default Layout
