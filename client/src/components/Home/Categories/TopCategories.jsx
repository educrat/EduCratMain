import React from "react";
import { Link } from "react-router-dom";
import topCategories from "../../../data/topCategories";
import "./TopCategories.css";

const Categories = ({ token }) => {
  return (
    <div className="categories_section">
      <h1>Browse with top categories</h1>
      <div className="categories_wrapper">
        {
          token
            ? topCategories.map((category, index) =>
              <Link className="category_link_wrapper" to={"/category/" + category.id}>
                <div
                  className="category_card"
                  style={{ background: category.bgColor }}
                  key={index}
                >
                  <img src={category.image} width={50} height={50} alt="" />
                  <span>{category.name}</span>
                </div>
              </Link>
            )
            : topCategories.map((category, index) =>
              <Link className="category_link_wrapper" to={"/signup"}>
                <div
                  className="category_card"
                  style={{ background: category.bgColor }}
                  key={index}
                >
                  <img src={category.image} width={50} height={50} alt="" />
                  <span>{category.name}</span>
                </div>
              </Link>
            )

        }
      </div>
    </div>
  );
};

export default Categories;
