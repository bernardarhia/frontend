import { Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Book from "./pages/Book";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/book/:id" element={<Book />} />
    </Routes>
  );
}

export default App;
