import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SizeBar from "../../components/sidebar/SizeBar";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home">
        <Posts />
        <SizeBar />
      </div>
    </div>
  );
};

export default Home;
