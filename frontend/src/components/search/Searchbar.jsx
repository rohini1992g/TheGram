import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./searchbar.css";
import axios from "axios";

export default function Searchbar({ setResults }) {
  const [input, setInput] = useState("");

  // useEffect(() => {
  //   const fetchData = async (value) => {
  //     const res = await axios.get("http://localhost:8000/api/users");
  //     const results = res.filter((user) => {
  //       return (
  //         user && user.username && user.username.toLowerCase().include(value)
  //       );
  //       setResults(results);
  //     });
  //   };

  //   fetchData(value);
  // }, []);

  // const handleChange = () => {
  //   setInput(value);
  // };

  return (
    <>
      <div className="inputWrapper">
        <SearchIcon className="searchIcon" />
        <input
          type="text"
          placeholder="Search for friends, Posts and Videos"
          value={input}
          // onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </>
  );
}
