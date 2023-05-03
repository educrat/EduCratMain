import React from "react";
import './CategoryCard.css';

const CategoryCard = ({ name, image }) => {
  return (
    <div className="category_container">
      <div className="img_wrapper">
        <img src={image} height={30} width={30} alt="" />
      </div>
      <div className="title_wrapper">
        <div className="field-name">{name}</div>
      </div>
    </div>
  );
};

export default CategoryCard;
