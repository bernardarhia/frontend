import { Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Book from "./pages/Book";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
import Unauthorized from "./pages/Unauthorized";
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
        </Route>

        {/* Normal user allowed page */}
        <Route element={<RequireAuth allowedRole={roleNames.USER} />}>
      <Route path="/" element={<Index />} />
          <Route path="/book/:id" element={<Book />} />
        </Route>
      </Route>

      {/* Catch all unknown paths */}
      <Route path="*" element={<h1>404... not found</h1>} />
    </Routes>
  );
}

export default App;
