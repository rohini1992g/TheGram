import React, { useState } from "react";
import "./searchResult.css";
export default function SearchResultList({ results }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  return (
    <div className="searchResult">
      {results.map((result, id) => {
        return (
          <>
            <img
              className="postProfileImage"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.jpeg"
              }
              alt=""
            />

            <div className="searchResultList">
              {results.map((result, id) => {
                return <div key={id}>{result.name}</div>;
              })}
            </div>
          </>
        );
      })}
    </div>
  );
}
