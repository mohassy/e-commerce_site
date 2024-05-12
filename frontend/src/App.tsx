import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.tsx";
import Products from "./pages/ProductList.tsx";
import Product from "./pages/Product.tsx";
import Cart from "./pages/Cart.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import {useSelector} from "react-redux";
import storeState from "./models/storeState.ts";

function App() {
    const user = useSelector((state: storeState)=> state.user.currentUser)
  return (
      <Router>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/search" element={<Home/>}/>
                  <Route path="/search/:keyword" element={<Products/>}/>
                  <Route path="/products" element={<Products/>}/>
                  <Route path="/products/:category" element={<Products/>}/>
                  <Route path="/product/:id" element={<Product/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/register" element={user ? <Home/> : <Register/>}/>
                  <Route path="/login" element={user ? <Home/> : <Login/>}/>
              </Routes>
      </Router>
  )
}

export default App
