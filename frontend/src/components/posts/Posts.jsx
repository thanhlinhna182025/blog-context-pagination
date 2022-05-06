import "./posts.css";
import Post from "../post/Post";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { BASEURL } from "../../context/Contains";
import axios from "axios";

const Posts = ({ cat }) => {
  const [posts, setPosts] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`${BASEURL}/api/posts`);
        const NUM_PER_POST_ON_PAGE = 4;
        let index_start =
          pageIndex * NUM_PER_POST_ON_PAGE - NUM_PER_POST_ON_PAGE;
        let index_end = index_start + NUM_PER_POST_ON_PAGE;
        if (res.data.success) {
          setPageCount(Math.ceil(res.data.posts.length / NUM_PER_POST_ON_PAGE));
          if (cat) {
            const postsfiltered = res.data.posts.filter(
              (post) => post.category === cat
            );
            setPosts(postsfiltered.slice(index_start, index_end));
            setPageCount(
              Math.ceil(postsfiltered.length / NUM_PER_POST_ON_PAGE)
            );
            return;
          }
          setPosts(res.data.posts.slice(index_start, index_end));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [pageIndex, cat]);

  const handlePageClick = (data) => {
    setPageIndex(data.selected + 1);
  };

  return (
    <div className="paginateposts">
      {posts ? (
        <div className="posts">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      ) : (
        <span>Server error</span>
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Posts;
