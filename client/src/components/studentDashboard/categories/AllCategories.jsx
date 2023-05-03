import React from 'react';
import { Link } from 'react-router-dom';
import allCategories from '../../../data/allCategories';
import topCategories from '../../../data/topCategories';
import './AllCategories.css'
import CategoryCard from './categoryCard/CategoryCard';

const Categories = () => {
  return (
    <div className='trending_cat_wrapper'>
      {
        topCategories.map((category, index) =>
          <Link to={'/category/' + category.id} key={index} >
            <CategoryCard image={category.image} name={category.name} key={index} />
          </Link>
        )
      }
    </div>
  )
}

export default Categories