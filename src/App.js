import { Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/user/Index";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Book from "./pages/Book";
import Dashboard from "./pages/admin/Dashboard";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
import Unauthorized from "./pages/Unauthorized";
import CreateBook from "./pages/admin/CreateBook";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "./context/CartProvider";
import Search from "./pages/Search";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/cart/Order";
function App() {
  const roleNames = {
    USER: "user",
    ADMIN: "admin",
  };
  return (
    <Routes>
      {/* All other public page */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<PersistLogin />}>
        {/* Admin Protected path */}
        <Route element={<RequireAuth allowedRole={roleNames.ADMIN} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book/create" element={<CreateBook />} />
        </Route>

        {/* Normal user allowed page */}
        <Route element={<RequireAuth allowedRole={roleNames.USER} />}>
          <Route element={<CartProvider />}>
          <Route path="/" element={<Index />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/search" element={<Search />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          </Route>
        </Route>
      </Route>

      {/* Catch all unknown paths */}
      <Route path="*" element={<h1 style={{textAlign:"center", margin:"2rem 0"}}>404... Not found</h1>} />
    </Routes>
  );
}

export default App;
