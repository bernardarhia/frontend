import React, { useState } from "react";
import "../styles/home.css";
import book from "../assets/book.jpg";
import Header from "../components/Header";
import Input from "../common/Input";
import Button from "../common/Button";
import searchIcon from "../assets/svgs/search.svg";
import Container from "../components/Container";
import "../styles/product.css"
const Book = () => {
  const [searchBarDisplay, setSearchBarDisplay] = useState(false);
  const toggleSearchBar = () => {
    setSearchBarDisplay(!searchBarDisplay);
  };
  return (
    <>
      <Container>
        <Header toggleSearchBar={toggleSearchBar} />
        {searchBarDisplay && (
          <div className="search-bar">
            <Input className="input" placeholder="Type book name" />
            <Button>
              <img src={searchIcon} alt="" />
            </Button>
          </div>
        )}

        <div className="product-container">
          <div className="product-image__container">
            <img src={book} alt="" />
          </div>
          <div className="product-details__container">
            <h1>A new product</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              voluptate aut quasi quod corrupti voluptates recusandae neque hic
              optio sit.
            </p>

            <div className="button-container">
              <Button className="cart-button">Add to cart</Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Book;
