import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/cart.css";
const OrderCard = ({ orderItem }) => {
  const axiosPrivate = useAxiosPrivate();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosPrivate.get(`/books/${orderItem.bookId}`);
        if (response?.data) {
          setBook(response?.data);
        }
      } catch (error) {
        console.log("error ", error);
      }
    };
    fetchBook();
  }, [orderItem.bookId, axiosPrivate]);
  return (
    <div className="cart-card">
      <div className="cart-card__content">
        <div className="cart-card__info">
          <div className="cart-image"></div>
          <div className="cart-text">
            <Link to={`/book/${orderItem?.bookId}`}>
              <h4>{book?.title}</h4>
            </Link>
            <p style={{ margin: ".6rem 0" }}>
              <span>Quantity: </span> <span>{orderItem?.quantity}</span>
            </p>
          </div>
        </div>
        <div className="cart-price">
          <h2>GHC{orderItem?.price.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};
export default OrderCard;
