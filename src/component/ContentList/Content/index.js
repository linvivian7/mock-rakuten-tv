import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import star from '../../../images/star-yellow.svg';
import user from '../../../images/user.svg';

import styles from './Content.module';

const Content = ({ info, history }) => {
  const [src, setSrc] = useState(info.images.coverBlur);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSrc(info.images.cover);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    history.push(`${info.type}/${info.id}`);
  };

  return (
    <div className={styles.content}>
      <div
        className={
          info.type === 'movies' ? styles.coverMovie : styles.coverShow
        }
        style={{
          backgroundImage: `url(${src})`,
        }}
        onClick={handleClick}
      />
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

export default withRouter(Content);
