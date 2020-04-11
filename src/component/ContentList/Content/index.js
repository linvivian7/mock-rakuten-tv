import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import star from '../../../images/star-yellow.svg';
import user from '../../../images/user.svg';

import styles from './Content.module';

const Content = ({ info, history }) => {
  const { id, images, type, highlightedScore } = info;
  const [src, setSrc] = useState(images.coverBlur);
  const ribbon = images.ribbons && images.ribbons[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSrc(images.cover);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    history.push(`${type}/${id}`);
  };

  return (
    <div className={styles.content}>
      <div
        className={type === 'movies' ? styles.coverMovie : styles.coverShow}
        style={{
          backgroundImage: `url(${src})`,
        }}
        onClick={handleClick}
      >
        {ribbon && (
          <span
            key={id}
            style={{
              color: ribbon.textColor ? ribbon.textColor : 'white',
              backgroundColor: ribbon.color,
            }}
            className={styles.ribbon}
          >
            {ribbon.localizedName}
          </span>
        )}
      </div>
      <div className={styles.secondary}>
        <div>
          <img src={star} width="12" alt="rating" loading="lazy" />
          <span className={styles.rating}>{highlightedScore.score}</span>
        </div>
        <div>
          <img src={user} width="12" alt="user" loading="lazy" />
          <span className={styles.rating}>
            {highlightedScore.formattedAmountOfVotes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Content);
