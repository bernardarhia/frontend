import { Link } from "react-router-dom";
import Button from "../common/Button";
import trashIcon from "../assets/svgs/trash.svg";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useCart from "../hooks/useCart";
import SmallLoader from "../common/SmallLoader";
import { useEffect, useState } from "react";
const CartCard = ({ cartItem, bookId }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({});
  const handleCartItemDelete = async (cartId) => {
    setLoading(true);
    try {
      const newCart = await axiosPrivate.delete("/cart/delete/item", {
        data: {
          cartId,
        },
      });
      if (newCart) {
        setCart(newCart?.data.cart);
      }
    } catch (error) {
      alert("An error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosPrivate.get(`/books/${bookId}`);
        if (response?.data) {
          setBook(response?.data);
        }
      } catch (error) {
        console.log("error ", error);
      }
    };
    fetchBook();
  }, [bookId, axiosPrivate]);
  return (
    <div className="cart-card">
      <div className="cart-card__content">
        <div className="cart-card__info">
          <div className="cart-image"></div>
          <div className="cart-text">
            <Link to={`/book/${book._id}`}>
              <h4>{book.title}</h4>
              <p style={{ margin: ".6rem 0" }}>
                <span>Quantity</span> <span>{cartItem?.quantity}</span>
              </p>
            </Link>
          </div>
        </div>
        <div className="cart-price">
          <h2>GHC{cartItem?.price.toFixed(2)}</h2>
        </div>
      </div>
      <div className="cart-buttons">
        <div className="remove">
          <div className="cart-increment__button">
            <Button
              className="button"
              onClick={() => handleCartItemDelete(cartItem?._id)}
            >
              {loading ? <SmallLoader /> : <img src={trashIcon} alt="" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
