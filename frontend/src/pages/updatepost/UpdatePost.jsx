import "./updatepost.css";
import { BASEURL, PF } from "../../context/Contains";
import { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

const UpdatePost = () => {
  const { user, categories } = useContext(Context);
  const [file, setFile] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const postId = location.pathname.split("/")[3];

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${BASEURL}/api/posts/${postId}`);
      if (res.data.success) {
        setCurrentPost(res.data.post);
        setTitle(res.data.post.title);
        setCategory(res.data.post.category);
        setDesc(res.data.post.desc);
      }
    };
    getPost();
  }, [postId]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatepost = { category, title, desc, username: user.username };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatepost.photo = filename;
      try {
        await axios.post(`${BASEURL}/api/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.put(`${BASEURL}/api/posts/${postId}`, updatepost);
      if (res.data.success) {
        setSuccessMessage(true);
        setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  return (
    <div className="postUpdate">
      {currentPost ? (
        <div className="postUpdateWrapper">
          {currentPost.photo ? (
            <div className="ImageContainer">
              <img
                src={file ? URL.createObjectURL(file) : PF + currentPost.photo}
                alt="imagepost"
              />
              <label htmlFor="InputChangeImage">
                <i className="changeImage fas fa-plus"></i>
              </label>
              <input
                id="InputChangeImage"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="ImageContainer">
              {file ? (
                <img src={URL.createObjectURL(file)} alt="imagepost" />
              ) : (
                <span>No images</span>
              )}

              <label htmlFor="InputChangeImage">
                <i className="changeImage fas fa-plus"></i>
              </label>
              <input
                id="InputChangeImage"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          )}

          <form className="updateForm" onSubmit={handleSubmit}>
            <div className="updateFormGruop">
              <label>Thể loại :</label>
              <select
                style={{ padding: "5px", border: "1px solid gray" }}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="updateFormGruop">
              <label>Tiêu đề :</label>
              <input
                className="updateInput"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="updateFormGruop">
              <label>Bài viết :</label>
              <textarea
                className="updateInput"
                style={{ minHeight: "50vh" }}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            {successMessage ? (
              <span style={{ color: "blue", fontSize: "18px" }}>
                Cập nhật thành công
              </span>
            ) : (
              ""
            )}
            <button type="submit" className="updateButton">
              Cập nhật
            </button>
          </form>
        </div>
      ) : (
        <span>Not Found</span>
      )}
    </div>
  );
};
export default UpdatePost;
