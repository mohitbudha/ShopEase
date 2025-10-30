import React, { useState } from 'react'
import Layout from './commponent/Layout'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import HeroPage from './commponent/pages/HeroPage'
import SingleProduct from './commponent/pages/SingleProduct'
import ShopPage from './commponent/pages/ShopPage'
import CartsPage from './commponent/pages/CartPage'
import CheckoutPage from './commponent/pages/CheckPage'
import FavoritePage from './commponent/pages/FavoritePage'
import UserProfile from './userpages/Profilepage'
import UserAuthForm from './userpages/AuthPage'
import UserLayout from './UserLayout'

const App = () => {
  const [searchTerm, setSearchTerm]= useState ("");
  const [Category, setCategory] = useState("all");
  return (
    <div>
     <BrowserRouter>
     
     <Layout setSearchTerm={setSearchTerm}
             setCategory={setCategory}>
              
      <Routes >
       <Route path="/" element={<HeroPage/>}/>
       <Route path='/product/:id' element={<SingleProduct/>}/>
       <Route path='/shop' element={<ShopPage searchTerm={ searchTerm }
                                              category={Category}/>}/>
       <Route path='/cart' element={<CartsPage/>}/>
       <Route path='/auth' element={<UserAuthForm/>}/>
       <Route path='/checkout' element={<CheckoutPage/>}/>
       <Route path='/favorite' element={<FavoritePage/>}/>
       <Route path='/profile' element={<UserProfile/>}/>
      </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
