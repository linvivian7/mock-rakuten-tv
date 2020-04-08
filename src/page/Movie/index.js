import React from 'react';
import { withRouter } from 'react-router-dom';

// components
import TopBanner from '../../component/TopBanner';
import List from '../../component/List';

// data
import movieLists from '../../../static/data/lists.json';

import styles from './Movie.module';

const Movie = ({ match, history }) => {
  const { id } = match.params;
  console.log('id', id);

  return (
    <div className={styles.body}>
      <TopBanner />
      <div></div>
    </div>
  );
};

export default withRouter(Movie);
