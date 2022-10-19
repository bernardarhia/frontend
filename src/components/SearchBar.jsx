import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import searchIcon from "../assets/svgs/search.svg";
import Button from "../common/Button";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!searchTerm) {
      alert("Type a search term");
      return;
    }
    navigate(`/search/?query=${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <Input
        className="input"
        placeholder="Type book name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>
        <img src={searchIcon} alt="" />
      </Button>
    </form>
  );
};

export default SearchBar;
