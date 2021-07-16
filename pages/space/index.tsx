import Head from "next/head";
import React from "react";
import { Page } from "../../typings/next";

const Space: Page = (props) => {
  return (
    <div>
      <Head>
        <title>个人主页｜Explore</title>
      </Head>
      abc
    </div>
  );
};

Space.getInitialProps = async ({reduxStore}) => {
  if(!reduxStore.getState().currentUser) {
    return {
      error: {
        code: 403,
        title: '无权限访问'
      }
    }
  }
  return {
    layout: 'space'
  };
};

export default Space;
