import Head from "next/head";
import { NextComponentType } from "next";
import React from "react";
import { AppPageContext } from "../typings/next";
import { LayoutKey } from "../layout";

const Home: NextComponentType<AppPageContext, {layout: LayoutKey}> = (props) => {
  return (
    <div>
      <Head>
        <title>首页｜Explore</title>
      </Head>
      abc
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  return {
    layout: 'default'
  };
};

export default Home;
