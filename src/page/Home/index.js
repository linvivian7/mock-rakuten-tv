import React from 'react';

// components
import TopBanner from '../../component/TopBanner';
import ContentList from '../../component/ContentList';

// data
import contentLists from '../../../static/data/lists.json';

import styles from './Home.module';

const Home = () => {
  return (
    <div className={styles.body}>
      <TopBanner />
      <div>
        {contentLists.map((contentList) => (
          <ContentList key={contentList.id} contentList={contentList} />
        ))}
      </div>
    </div>
  );
};

export default Home;
