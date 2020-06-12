import React from 'react';
import {Layout} from 'antd';
import HeaderComponent from 'components/HeaderComponent';
import HomeContent from 'components/home/HomeContent';

function Home(){
  return (
    <Layout>
      <HeaderComponent/>
      <HomeContent/>
    </Layout>
  );
}

export default Home;