import React from 'react';
import Hero from '../components/Hero';
import MenuAppBar from '../components/MenuAppBar';

const Home = () => {
  return (
    <React.Fragment>
      <MenuAppBar />
      <Hero />
    </React.Fragment>
  );
};

export default Home;
