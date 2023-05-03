import React from "react";
import Header from "../../components/Home/Header/Header";
import TopCategories from "../../components/Home/Categories/TopCategories";
import Footer from "../../components/Home/footer/Footer";

const HomePage = ({ token }) => {
  return (
    <div>
      <Header />
      <TopCategories token={token} />
    </div>
  );
};

export default HomePage;
