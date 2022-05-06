import "./sizebar.css";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASEURL } from "../../context/Contains";
import img3 from "../../image/img3.JPG";
import { useContext } from "react";
import { Context } from "../../context/Context";

const SizeBar = () => {
  const { dispatch, categories, darkmode } = useContext(Context);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`${BASEURL}/api/categories`);
      if (res.data.success) {
        dispatch({ type: "SET_CATEGORIES", payload: res.data.cats });
      }
    };
    getCats();
  }, [categories]);

  return (
    <div
      className="sizebar"
      style={{
        backgroundColor: darkmode ? "var(--orange)" : "var(--blueCard)",
      }}
    >
      <div className="sizebarItem">
        <span className="sizebarTitle">Cuộc sống của tôi</span>
        <img src={img3} alt="" className="sizebarImg" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste possimus
          temporibus pariatur magni quae delectus!
        </p>
      </div>
      <div className="sizebarItem">
        <span className="sizebarTitle">Thể loại</span>
        <ul className="sizebarList">
          {categories?.map((cat) => (
            <Link
              to={`/posts/category/${cat.name}`}
              key={cat._id}
              className="link mobile"
            >
              <li className="sizebarListItem">{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sizebarItem">
        <span className="sizebarTitle">Theo dõi tôi</span>
        <div className="sizebarSocial">
          <i className="sizebarIcon fa-brands fa-facebook"></i>
          <i className="sizebarIcon fa-brands fa-twitter"></i>
          <i className="sizebarIcon fa-brands fa-pinterest"></i>
          <i className="sizebarIcon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default SizeBar;
