import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// components
import TopBanner from '../../component/TopBanner';
import List from '../../component/List';

// data
import movies from '../../../static/data/movies.json';
import sample from '../../../sample-movie.json';

import styles from './Movie.module';

const Movie = ({ match, history }) => {
  const { id } = match.params;
  let movie = movies[id];
  const hasMovie = !!movie;
  const [src, setSrc] = useState(hasMovie && movie.images.snapshot);

  if (hasMovie) {
    useEffect(() => {
      setTimeout(() => {
        setSrc(movie.images.snapshot);
      }, 800);
    }, []);
  } else {
    console.log(sample);
    movie = sample.data;
  }

  return (
    movie && (
      <div className={styles.body}>
        <TopBanner />
        <div
          style={{ width: '100%', backgroundColor: 'white', height: 'auto' }}
        >
          <img className={styles.snapshot} src={src} alt="snapshot" />
        </div>
        {/* info */}
        <div className={styles.info}>
          <div className={styles.general}>
            <div>
              <span>User</span>
              <span>minutes</span>
              <span>year</span>
              <span>country</span>
              <span>original title</span>
            </div>
            <div>label</div>
            <p>{movie.classification.description}</p>
          </div>
          <aside className={styles.social}>aside</aside>
        </div>
      </div>
    )
  );
};

export default withRouter(Movie);
