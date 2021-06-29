import { NextComponentType } from 'next';
import Head from 'next/head';
import React from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const Home: NextComponentType = (props) => {

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

export default Home;
