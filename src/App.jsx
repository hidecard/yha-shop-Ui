import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 text-white bg-orange-600">
        <div className="container flex items-center justify-between mx-auto">
          <Link to="/" className="text-2xl font-bold">YHA Shop</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;