import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CartContext = createContext({});
export const CartProvider = () => {
  const axiosPrivate = useAxiosPrivate();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchCartItems = async function () {
      try {
        const cart = await axiosPrivate.get("/cart/all");
        setCart(cart?.data.cart);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, [axiosPrivate]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Outlet />
    </CartContext.Provider>
  );
};

export default CartContext;
