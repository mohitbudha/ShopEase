import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { SearchProvider } from './context/SearchContex.jsx'

createRoot(document.getElementById('root')).render(

  <SearchProvider>
  <CartProvider>
    <StrictMode>
    <App />
  </StrictMode>,
  </CartProvider>
  </SearchProvider>
)
