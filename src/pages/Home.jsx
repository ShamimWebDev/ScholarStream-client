import React from "react";
import Banner from "../components/Home/Banner";
import HowItWorks from "../components/Home/HowItWorks";
import TopScholarships from "../components/Home/TopScholarships";
import SuccessStories from "../components/Home/SuccessStories";
import Faq from "../components/Home/Faq";
import Stats from "../components/Home/Stats";
import Categories from "../components/Home/Categories";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Contributors from "../components/Home/Contributors";
import Newsletter from "../components/Home/Newsletter";

const Home = () => {
  return (
    <div>
      <Banner />
      <Stats />
      <TopScholarships />
      <Categories />
      <HowItWorks />
      <WhyChooseUs />
      <SuccessStories />
      <Contributors />
      <Faq />
      <Newsletter />
    </div>
  );
};

export default Home;
