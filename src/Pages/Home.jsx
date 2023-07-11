import React, { Fragment } from "react";
import AboutUs from "../Components/About Us/AboutUs";
import Header from "../Components/Header/Header";
import Feature from "../Components/Feature/Feature";
import HeroSection from "../Components/Hero Section/HeroSection";
import ChooseUs from "../Components/Choose Us/ChooseUs";
import Footer from "../Components/Footer/Footer";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <HeroSection/>
      <Feature/>
      <AboutUs />
      <ChooseUs/>
      <Footer/>
    </Fragment>
  );
};

export default Home;
