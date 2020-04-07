import React from 'react';
import { Link } from 'react-router-dom';

// TOFIX: use api for list json
import TopBanner from '../../component/TopBanner';
import Genre from '../../component/Genre';

const Home = () => {
  return (
    <>
      <TopBanner />
      <Genre />
    </>
  );
};

export default Home;
