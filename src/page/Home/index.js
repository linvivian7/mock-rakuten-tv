import React from 'react';

// components
import TopBanner from '../../component/TopBanner';
import List from '../../component/List';

// data
import movieLists from '../../../static/data/lists.json';

import styles from './Home.module';

const Home = () => {
  return (
    <div className={styles.body}>
      <TopBanner />
      <div>
        {movieLists.map((movieList) => (
          <List key={movieList.id} movieList={movieList} />
        ))}
      </div>
    </div>
  );
};

export default Home;
