import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";

import "./profile.css";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={PF + "/person/noCover1.png"} //user.profilePicture||
                alt="the image"
                className="profileCoverImage"
              />
              <img
                src={PF + "/person/noAvatar.jpeg"}
                alt="the image"
                className="profileUserImage"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileNameInfo">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <button className="editProfileButton">
            <b>Edit Profile</b>
          </button>
          <div className="folloTextNumber">
            <div className="followText">
              0<b>Posts </b>
            </div>
            <div className="followText">
              0<b>following </b>
            </div>
            <div className="followText">
              0<b>followers </b>
            </div>
          </div>
          <hr className="profileHr" />
          <div>Post</div>
          <div className="profileRightBottom">
            <div className="postUserImage">
              <Feed username={username} />

              <Rightbar user={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
