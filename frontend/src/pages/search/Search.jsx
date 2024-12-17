import React, { useState } from "react";
import "./search.css";
import Searchbar from "../../components/search/Searchbar.jsx";
import SearchResultList from "../../components/search/SearchResultList.jsx";

export default function Search() {
  const [result, setResult] = useState([]);

  return (
    <div className="search">
      <div className="searchbarContainer">
        <Searchbar setResult={setResult} />
        <SearchResultList result={result} />
      </div>
    </div>
  );
}
