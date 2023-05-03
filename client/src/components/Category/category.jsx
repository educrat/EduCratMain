import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import allCategories from "../../data/allCategories";
import Categories from "../Home/Categories/TopCategories";
import CategoryCard from "../studentDashboard/categories/categoryCard/CategoryCard";
import CardSwiper from "../swiper/CardSwiper";
import "./category.css";

const Category = () => {
  let { categoryId } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    setData(allCategories[categoryId]);
    window.scrollTo(0, 0);
  }, []);

  return (

    <div className="category_page">
      <div className="category_page_category_container">
        {data &&
          data.map((element, index) => (
            <Link to={"/category/" + element.title}>
              <CategoryCard key={index} name={element.title} image={element.image} />
            </Link>
          ))}
      </div>
      <CardSwiper mode={"gig-category"} category={categoryId} />
    </div>
  );
};

export default Category;
