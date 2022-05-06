import "./post.css";
import { BASEURL } from "../../context/Contains";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  const PF = `${BASEURL}/images/`;
  return (
    <div className="post">
      {post.photo && (
        <img src={PF + post.photo} alt="itImg" className="postImg" />
      )}
      <div className="postInfo">
        <div className="postCats">
          <label>Chủ đề : </label>
          <span className="postCat" key={post._id}>
            {post.category}
          </span>
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <h2 className="postTitle">{post.title}</h2>
        </Link>
        <hr />
        <div className="containerAuthor">
          <span className="postAuthor">
            Author : <b>{post.username}</b>
          </span>
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
};

export default Post;
