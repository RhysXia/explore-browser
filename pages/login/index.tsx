import { NextComponentType } from "next";
import Head from "next/head";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { AppPageContext } from "../../typings/next";

const Login: NextComponentType<AppPageContext> = (props) => {
  return (
    <div>
      <Head>
        <title>登录｜Explore</title>
      </Head>
      <Header />
      <Footer />
    </div>
  );
};

export default Login;
