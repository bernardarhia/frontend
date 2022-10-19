import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import illustration from "../../assets/pngs/illustration.png";
import bg from "../../assets/pngs/bg.png";
import Header from "../../components/Header";
import BookCard from "../../common/BookCard";
import HeaderText from "../../common/HeaderText";
import Container from "../../components/Container";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SearchBar from "../../components/SearchBar";

const Index = () => {
  const axiosPrivate = useAxiosPrivate();
  const [books, setBooks] = useState([]);
  const { auth } = useAuth();
  const [searchBarDisplay, setSearchBarDisplay] = useState(false);

  const toggleSearchBar = () => {
    setSearchBarDisplay(!searchBarDisplay);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get("/books", {
          signal: controller.signal,
        });
        isMounted && setBooks(response?.data.books);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Container>
        <Header toggleSearchBar={toggleSearchBar} />
        <div style={{ margin: "2rem 0" }}>
          <HeaderText>Welcome {auth?.user}</HeaderText>
        </div>

        {searchBarDisplay && <SearchBar />}

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

        <div style={{ margin: "6rem 0" }}>
          <HeaderText>Popular books</HeaderText>
        </div>
        <section className="cards">
          {!books && "Loading books...."}
          {books.map((book, index) => (
            <BookCard book={book} key={index} />
          ))}
          {books.length < 1 && "No book found in the store"}
        </section>
      </Container>
    </>
  );
};

export default Index;
