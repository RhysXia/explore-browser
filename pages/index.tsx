import Head from "next/head";
import { NextComponentType } from "next";
import Header from "../components/Header";
import React from "react";
import Footer from "../components/Footer";
import { AppPageContext } from "../typings/next";
import { useAppSelector } from "../lib/redux";

const Home: NextComponentType<AppPageContext> = (props) => {
  const token = useAppSelector((store) => store.token);

  console.log(token);

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

Home.getInitialProps = async (ctx) => {
  return {
    a: 1,
  };
};

export default Home;
