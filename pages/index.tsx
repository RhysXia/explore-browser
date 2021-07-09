import Head from "next/head";
import { NextComponentType } from "next";
import Header from "../components/Header";
import React from "react";
import Footer from "../components/Footer";
import { AppPageContext } from "../typings/next";

const Home: NextComponentType<AppPageContext> = (props) => {
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

// Home.getInitialProps = async (ctx) => {
//   return {};
// };

export default Home;
