import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import castPlaceholder from '../../../images/cast-placeholder.png';
import styles from './Cast.module';

const Cast = ({ isDirector, name, photo }) => {
  const [src, setSrc] = useState(castPlaceholder);

  if (photo) {
    useEffect(() => {
      const timer = setTimeout(() => {
        setSrc(photo);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }, []);
  }

  return (
    <div className={styles.cast}>
      <img className={styles.photo} src={src} alt="photo" />
      <div className={styles.name}>{name}</div>
      {isDirector && <div className={styles.director}>Director</div>}
    </div>
  );
};

export default withRouter(Cast);
