import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../common/BookCard";
import Container from "../components/Container";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Search = () => {
  const [searchBarDisplay, setSearchBarDisplay] = useState(false);
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("query");
  const axiosPrivate = useAxiosPrivate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSearchBar = () => {
    setSearchBarDisplay(!searchBarDisplay);
  };
  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      try {
        const { data } = await axiosPrivate.post("/books/search", {
          query,
        });
        if (data) setBooks(data.books);
      } catch (error) {
        alert("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    handleSearch();
  }, [query]);

  return (
    <Container>
      <Header toggleSearchBar={toggleSearchBar} />
      {searchBarDisplay && <SearchBar />}

      <div className="search-result">
        <h1>Search results ({books.length})</h1>

        {loading && <h3>Fetching data...</h3>}
        <div className="show-case">
          <div className="cards">
            {books.map((book, index) => (
              <BookCard book={book} key={index} />
            ))}
            {books.length < 1 && "No book found in the store"}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Search;
