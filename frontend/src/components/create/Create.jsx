import React, { useContext, useRef, useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import RoomIcon from "@mui/icons-material/Room";
import CancelIcon from "@mui/icons-material/Cancel";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import "./create.css";

import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Rightbar from "../rightbar/Rightbar";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Create() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      //  console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:" + error);
    };
  };

  const submitHandler = async (e) => {
    console.log("hiii");
    e.preventDefault();
    await axios.post("http://localhost:8000/api/posts/upload", {
      body: JSON.stringify({
        base64: image,
      }),
    });
    console.log("ok");
  };

  return (
    <>
      <Topbar />
      <div className="create">
        <Sidebar />
        <div className="createWrapper">
          <div className="createTop">
            {/* <img
              src={user.profilePicture || PF + "person/noAvatar.jpeg"}
              alt="the image"
              className="topbarImg"
            /> */}
            <input
              type="text"
              placeholder={"What's your mind " + user.username + "?"}
              className="createInput"
              ref={desc}
            />
          </div>
          <hr className="createHr" />
          {image === "" || image === null ? (
            ""
          ) : (
            <div className="createImgContainer">
              <img className="createImg" src={image} alt="" />
              <CancelIcon
                className="createCancelImg"
                onClick={() => setImage(null)}
              />
            </div>
          )}
          <div className="createBottom">
            <form
              className="createOptions"
              onSubmit={(e) => {
                console.log("Form submitted");
                submitHandler(e);
              }}
            >
              <label htmlFor="file" className="createOption">
                <PermMediaIcon className="createIcon" />

                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={convertToBase64}
                />
              </label>
              <div className="createOption">
                <LabelImportantIcon className="createIcon" />
                <span className="createOptionText">Tag</span>
              </div>
              <div className="createOption">
                <RoomIcon className="createIcon" />
                <span className="createOptionText">Location</span>
              </div>
              <div className="createOption">
                <EmojiEmotionsIcon className="createIcon" />
                <span className="createOptionText">Feelings</span>
              </div>

              <button className="createButton" type="submit">
                Share
              </button>
            </form>
          </div>
        </div>

        <Rightbar user />
      </div>
    </>
  );
}
