import { Link } from "@mui/material";
import "./rightbar.css";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  console.log(user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser, dispatch } = useContext(AuthContext);

  const HomeRightbar = (e) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    console.log("usename is" + user);

    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "person/gift.jpeg"} alt="" />
          <span className="birthdayText">
            <b>John Carter</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF + "person/fun.jpeg"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <li>Ramesh</li>
          <li>Ramesh</li>
          <li>Ramesh</li>
          <li>Ramesh</li>
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    <>
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">New York</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">Madrid</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img
            src="person/noAvatar.jpeg"
            alt=""
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img
            src="person/noAvatar.jpeg"
            alt=""
            className="rightbarFollowingImg"
          />
        </div>
      </div>
    </>;
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
