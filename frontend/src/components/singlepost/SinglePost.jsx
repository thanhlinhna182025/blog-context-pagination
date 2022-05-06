import "./singlePost.css";
import { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BASEURL, PF } from "../../context/Contains";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

import axios from "axios";

const SinglePost = () => {
  const [currentPost, setCurrentPost] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${BASEURL}/api/posts/${postId}`);
      if (res.data.success) {
        setCurrentPost(res.data.post);
      }
    };
    getPost();
  }, []);
  const handleDelete = async () => {
    window.confirm("Do you want delete this post ");
    try {
      const res = await axios.delete(`${BASEURL}/api/posts/${postId}`, {
        data: { username: user.username },
      });
      if (res.data.success) {
        setSuccessMessage(true);
        setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="singlePost">
      {currentPost ? (
        <div className="postView">
          <img src={`${PF}` + currentPost.photo} />
          <h1 className="postViewTitle">{currentPost.title}</h1>
          <div className="postView-info">
            <div className="titlePostContainer">
              <label>Actor :</label>
              <span>{currentPost.username}</span>
            </div>
            <span>{new Date(currentPost.createdAt).toLocaleString()}</span>
          </div>
          <p className="postViewDesc">{currentPost.desc}</p>
          {successMessage ? (
            <span style={{ color: "blue", fontSize: "18px" }}>
              Đã xóa thành công
            </span>
          ) : (
            ""
          )}
          {user && currentPost.username === user.username ? (
            <div className="postSetting">
              <i
                className="postSettingIcon fa-solid fa-trash-can"
                onClick={handleDelete}
              ></i>
              <Link to={`update/${currentPost._id}`}>
                <i className="postSettingIcon fa-solid fa-pen-to-square"></i>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SinglePost;
