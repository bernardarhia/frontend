import React, { useState } from "react";
import "../styles/home.css";
import illustration from "../assets/pngs/illustration.png";
import bg from "../assets/pngs/bg.png";
import Header from "../components/Header";
import BookCard from "../common/BookCard";
import Input from "../common/Input";
import Button from "../common/Button";
import searchIcon from "../assets/svgs/search.svg";

const Index = () => {
  const [searchBarDisplay, setSearchBarDisplay] = useState(false);
  const toggleSearchBar = () => {
    setSearchBarDisplay(!searchBarDisplay);
  };
  return (
    <>
      <div className="main-container">
        <Header toggleSearchBar={toggleSearchBar} />
        {searchBarDisplay && (
          <div className="search-bar">
            <Input className="input" placeholder="Type book name" />
            <Button>
              <img src={searchIcon} alt="" />
            </Button>
          </div>
        )}

        <div className="showcase" style={{ backgroundImage: `url(${bg})` }}>
          <div className="showcase-content">
            <p>BIG SUMMER SALE</p>
            <span className="number">60</span>
            <span className="percent">
              <sub>%</sub>
            </span>
          </div>
          <div className="showcase-img">
            <img src={illustration} alt="" />
          </div>
        </div>
        <section className="cards">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </section>
      </div>
    </>
  );
};

export default Index;
