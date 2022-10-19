import useAxiosPrivate from "./useAxiosPrivate";

const useAddToCart = () => {

  const axiosPrivate = useAxiosPrivate();
  const addItemToCart = async (productId, quantity = 1) => {
    const cart = await axiosPrivate.post("/cart/add", { productId, quantity });
    return cart;
  };
    return addItemToCart;
};

export default useAddToCart;
