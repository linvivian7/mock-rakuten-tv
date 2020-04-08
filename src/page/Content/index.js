import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// components
import TopBanner from '../../component/TopBanner';

// data
import movies from '../../../static/data/movies.json';
import shows from '../../../static/data/shows.json';

import styles from './Content.module';

const Content = ({ match }) => {
  const { id } = match.params;
  let content = movies[id] || shows[id];
  const hasContent = !!content;
  const [src, setSrc] = useState(hasContent && content.images.snapshotBlur);

  console.log(content);

  if (hasContent) {
    useEffect(() => {
      setTimeout(() => {
        setSrc(content.images.snapshot);
      }, 400);
    }, []);
  } else {
    console.log(sample);
    content = sample.data;
  }

  return (
    content && (
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
              <span>Age {content.classification.name}</span>
              <span>Min {content.duration} minutes</span>
              <span>year {content.year}</span>
              <span>country {content.countries.join(', ')}</span>
              <span>original title: {content.originalTitle}</span>
            </div>
            <div>label</div>
            <p>{content.plot}</p>
          </div>
          <aside className={styles.social}>aside</aside>
        </div>
      </div>
    )
  );
};

export default withRouter(Content);
