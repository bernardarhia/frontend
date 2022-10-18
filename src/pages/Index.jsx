import React, { useState } from "react";
import "../styles/home.css";
import illustration from "../assets/pngs/illustration.png";
import bg from "../assets/pngs/bg.png";
import Header from "../components/Header";
import BookCard from "../common/BookCard";
import Input from "../common/Input";
import Button from "../common/Button";
import searchIcon from "../assets/svgs/search.svg";
import HeaderText from "../common/HeaderText";
import Container from "../components/Container";
import useBooks from "../hooks/useBooks";
import useAuth from "../hooks/useAuth";

const Index = () => {
  const {books} = useBooks()
  const {auth} = useAuth()
  const [searchBarDisplay, setSearchBarDisplay] = useState(false);
  const toggleSearchBar = () => {
    setSearchBarDisplay(!searchBarDisplay);
  };
  console.log(books);
  return (
    <>
      <Container>
        <Header toggleSearchBar={toggleSearchBar} />
        <div style={{margin:"2rem 0"}}>
        <HeaderText>Welcome {auth?.user}</HeaderText>
        </div>

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
        
        <div style={{margin:"6rem 0"}}>
        <HeaderText>Popular books</HeaderText>
        </div>
        <section className="cards">
          <BookCard />
          <BookCard />
        </section>
      </Container>
    </>
  );
};

export default Index;
