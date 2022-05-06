import React from "react";
import Posts from "../../components/posts/Posts";
import SizeBar from "../../components/sidebar/SizeBar";
import "./category.css";
import { useLocation } from "react-router-dom";

const Category = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[3];
  return (
    <div className="category">
      <Posts cat={cat} />
      <SizeBar />
    </div>
  );
};

export default Category;
