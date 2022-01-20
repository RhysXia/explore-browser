import Head from 'next/head';
import React from 'react';
import { Page } from '../../typings/next';

const Home: Page = (props) => {
  return (
    <>
      <Head>
        <title>首页｜Explore</title>
      </Head>
      <div>abc</div>
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  return {
    layout: 'default',
  };
};

export default Home;
