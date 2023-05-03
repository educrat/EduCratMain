import React from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='page-not-found'>
        <div className='pnf-container'>
            <div className='pnf-no'>404</div>
            <div className='pnf-text'>PAGE NOT FOUND</div>
            <Link to={"/dashboard"}><button className='go-home-btn'>Go Home</button></Link>
        </div>
    </div>
  )
}

export default PageNotFound