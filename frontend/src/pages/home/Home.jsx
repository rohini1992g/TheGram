import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import "./home.css";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get("http://localhost:8000/api/auth/verify", user._id)
        .then((res) => {
          if (res.data.status) {
            console.log("verified user");
          } else {
            history.push("/login");
          }
          console.log(res);
        });
    };
    fetchdata();
  }, [user, history]);
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
