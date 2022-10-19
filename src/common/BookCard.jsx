import React, { useState } from "react";
import { Link } from "react-router-dom";
import crazyRichAsianImage from "../assets/pngs/crazyrichasians.png";
import useAddToCart from "../hooks/useAddToCart";
import useCart from "../hooks/useCart";
import Button from "./Button";

const BookCard = ({ book }) => {
  const addItemToCart = useAddToCart();
  const { setCart } = useCart();
  const [loading, setIsLoading] = useState(false);
  const handleItemToCart = async (id) => {
    setIsLoading(true);
    const newCart = await addItemToCart(id);
    if (newCart) {
      setIsLoading(false);
      setCart(newCart?.data.cart);
      alert("Item added to cart");
    }
  };
  return (
    <div className="card">
      <div className="card-img">
        <img src={crazyRichAsianImage} alt="crazy rich asians" />
      </div>
      <div className="card-content">
        <p className="author">{book?.author.username}</p>
        <Link to={`/book/${book?._id}`}>
          <h3>{book?.title}</h3>
        </Link>
        <p className="content">{book?.description}</p>
        <div className="current-amount">
          <span className="first">GH&#8373;{book?.price.toFixed(2)}</span>
        </div>
        <Button
          className="cart-button"
          onClick={() => handleItemToCart(book._id)}
          disabled={loading && true}
        >
          {loading ? "Loading...." : "Add to cart"}
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
