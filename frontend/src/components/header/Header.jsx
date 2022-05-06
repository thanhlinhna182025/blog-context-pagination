import "./header.css";
import img1 from "../../image/img1.JPG";
const Header = () => {
  return (
    <div className="header">
      <img src={img1} alt="headerImg" className="headerImg" />
    </div>
  );
};

export default Header;
