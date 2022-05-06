import "./single.css";
import Sidebar from "../../components/sidebar/SizeBar";
import SinglePost from "../../components/singlepost/SinglePost";
const Single = () => {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
};

export default Single;
