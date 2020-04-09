import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// components
import TopBanner from '../../component/TopBanner';
import General from '../../component/General';
import Social from '../../component/Social';

// data
import movies from '../../../static/data/movies.json';
import shows from '../../../static/data/shows.json';

import styles from './Content.module';

const Content = ({ match }) => {
  const { id } = match.params;
  let content = movies[id] || shows[id];
  const hasContent = !!content;
  const [src, setSrc] = useState(hasContent && content.images.snapshotBlur);
  console.log('content', content);

  if (hasContent) {
    useEffect(() => {
      const timer = setTimeout(() => {
        setSrc(content.images.snapshot);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }, []);
  }

  return (
    hasContent && (
      <div className={styles.body}>
        <TopBanner />
        <div className={styles.snapshotWrapper}>
          <img className={styles.snapshot} src={src} alt="snapshot" />
        </div>
        <div className={styles.info}>
          <Social />
          <General content={content} />
        </div>
      </div>
    )
  );
};

export default withRouter(Content);
