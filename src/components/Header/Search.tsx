import "./styles/Search.css";
import search from "./images/magnify.svg";
import back from "./images/arrow-left.svg";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const context = useContext<any>(AppContext);
  const navigator = useNavigate();

  function handleSearchStatusChange() {
    context.searchHandler.setSearch({
      ...context.searchHandler.search,
      searchStatus: !context.searchHandler.search.searchStatus,
    });
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      context.searchHandler.setSearch({
        ...context.searchHandler.search,
        searchTerm: e.currentTarget.value,
      });
      navigator("/search");
    }
  }

  return context.searchHandler.search.searchStatus ? (
    <div className="SearchBox">
      <img className="search-box-img" src={back} alt="arrow back" />
      <input
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={handleEnter}
        className="search-box-input"
        placeholder="Search"
        type="text"
        autoFocus
      />
    </div>
  ) : (
    <div className="Search" onClick={handleSearchStatusChange}>
      <img className="search-img" src={search} alt="search" />{" "}
      <span className="search-text">Search</span>
    </div>
  );
}

export default Search;
