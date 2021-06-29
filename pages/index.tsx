import Head from "next/head";
import { NextComponentType } from "next";
import Header from "../components/Header";
import React from "react";
import Footer from "../components/Footer";

const Home: NextComponentType = (props) => {

  return (
    <div>
      <Head>
        <title>首页｜Explore</title>
      </Head>
      <Header />
      <Footer />
    </div>
  );
};

export default Home;
