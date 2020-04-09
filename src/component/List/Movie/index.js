import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import star from '../../../images/star-yellow.svg';
import user from '../../../images/user.svg';

import styles from './Movie.module';

const Movie = ({ info, history }) => {
  const [src, setSrc] = useState(info.images.coverBlur);

  useEffect(() => {
    setTimeout(() => {
      setSrc(info.images.cover);
    }, 200);
  }, []);

  return (
    <div
      className={styles.movie}
      onClick={() => history.push(`${info.type}/${info.id}`)}
    >
      <div
        styles={{ width: '180px', backgroundColor: 'white', height: '206px' }}
      >
        <img className={styles.cover} src={src} alt="cover" />
      </div>
      <div className={styles.secondary}>
        <div>
          <img src={star} width="12" alt="rating" loading="lazy" />
          <span className={styles.rating}>{info.highlightedScore.score}</span>
        </div>
        <div>
          <img src={user} width="12" alt="user" loading="lazy" />
          <span className={styles.rating}>
            {info.highlightedScore.formattedAmountOfVotes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Movie);
