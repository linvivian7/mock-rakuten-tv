import React, { useRef, useEffect, useState } from 'react';

import star from '../../../images/star.svg';
import user from '../../../images/user.svg';

import styles from './Movie.module';

const Movie = ({ info }) => {
  const [src, setSrc] = useState(info.images.coverBlur);
  useEffect(() => {
    setTimeout(() => {
      setSrc(info.images.cover);
    }, 800);
  }, []);

  return (
    <div className={styles.movie}>
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
          <img src={user} width="12" alt="rating" loading="lazy" />
          <span className={styles.rating}>{info.highlightedScore.score}</span>
        </div>
      </div>
    </div>
  );
};

export default Movie;
