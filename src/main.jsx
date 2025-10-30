import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { SearchProvider } from './context/SearchContex.jsx'
import { FavoriteProvider } from './context/FavoriteContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
  <UserProvider>
  <SearchProvider>
  <CartProvider>
    <FavoriteProvider>
    <App />
  </FavoriteProvider>
  </CartProvider>
  </SearchProvider>
  </UserProvider>
  </StrictMode>
)
