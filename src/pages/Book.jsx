import React, { useEffect, useState } from "react";
import "../styles/home.css";
import bookImage from "../assets/book.jpg";
import Header from "../components/Header";
import Input from "../common/Input";
import Button from "../common/Button";
import Container from "../components/Container";
import "../styles/product.css";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAddToCart from "../hooks/useAddToCart";
import useCart from "../hooks/useCart";
import SearchBar from "../components/SearchBar";
const Book = () => {
  const param = useParams();
  const { id } = param;
  const [searchBarDisplay, setSearchBarDisplay] = useState(false);
  const [itemQuantityCount, setItemQuantityCount] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const { setCart } = useCart();

  const [book, setBook] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const addItemToCart = useAddToCart();

  const toggleSearchBar = () => {
    setSearchBarDisplay(!searchBarDisplay);
  };
  // handle cart quantity decrement
  const incrementCartQuantity = () => {
    setItemQuantityCount(itemQuantityCount + 1);
  };

  // Handles cart quantity increment
  const decrementCartQuantity = () => {
    setItemQuantityCount(itemQuantityCount - 1);
  };

  const handleItemToCart = async (id) => {
    setIsLoading(true);
    const newCart = await addItemToCart(id, itemQuantityCount);
    if (newCart) {
      setIsLoading(false);
      setCart(newCart?.data.cart);
      alert("Item added to cart");
    }
  };
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosPrivate.get(`/books/${id}`);
        if (response?.data) {
          console.log(response?.data);
          setBook(response?.data);
        }
      } catch (error) {
        console.log("error ", error);
      }
    };
    fetchBook();
  }, [axiosPrivate, id]);

  return (
    <>
      <Container>
        <Header toggleSearchBar={toggleSearchBar} />
        {searchBarDisplay && <SearchBar />}

        {book && (
          <div className="product-container">
            <div className="product-image__container">
              <img src={bookImage} alt="" />
            </div>
            <div className="product-details__container">
              <h1>{book.title}</h1>
              <p>{book?.description}</p>
              <h5>GH&#8373;{book?.price}</h5>
              <div className="cart-increment__button">
                <Button
                  onClick={decrementCartQuantity}
                  disabled={itemQuantityCount < 1 ? true : false}
                >
                  -
                </Button>
                <Input
                  type="text"
                  value={itemQuantityCount}
                  onChange={(e) => setItemQuantityCount(e.target.value)}
                />
                <Button onClick={incrementCartQuantity}>+</Button>
              </div>
              <div className="button-container">
                <Button
                  className="cart-button"
                  onClick={() => handleItemToCart(book?._id)}
                >
                  {loading ? "Loading..." : "Add to cart"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Book;
