import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SizeBar from "../../components/sidebar/SizeBar";

const Home = () => {
  console.log(process.env.NODE_ENV);
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
