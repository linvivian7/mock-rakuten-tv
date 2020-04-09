import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// components
import TopBanner from '../../component/TopBanner';

// icons
import calendar from '../../images/calendar.svg';
import duration from '../../images/duration.svg';
import facebook from '../../images/facebook.svg';
import flag from '../../images/flag.svg';
import info from '../../images/info.svg';
import parental from '../../images/parental.svg';
import pinterest from '../../images/pinterest.svg';
import speechBubble from '../../images/speech-bubble.svg';
import starBlack from '../../images/star-black.svg';
import twitter from '../../images/twitter.svg';
import user from '../../images/user.svg';
import view from '../../images/view.svg';

// data
import movies from '../../../static/data/movies.json';
import shows from '../../../static/data/shows.json';

import styles from './Content.module';

const socials = {
  seen: {
    icon: view,
    text: 'Mark as Seen',
  },
  facebook: {
    icon: facebook,
    text: 'Facebook',
  },
  twitter: {
    icon: twitter,
    text: 'Twitter',
  },
  pinterest: {
    icon: pinterest,
    text: 'Pinterest',
  },
};

const IconInfo = ({ icon, alt, text, width = 12 }) => (
  <span className={styles.iconInfo}>
    <span>
      <img src={icon} width={width} alt={alt} loading="lazy" />
    </span>
    {text}
  </span>
);

const Content = ({ match }) => {
  const { id } = match.params;
  let content = movies[id] || shows[id];
  const hasContent = !!content;
  const [src, setSrc] = useState(hasContent && content.images.snapshotBlur);
  console.log('content', content);

  if (hasContent) {
    useEffect(() => {
      setTimeout(() => {
        setSrc(content.images.snapshot);
      }, 400);
    }, []);
  }

  return (
    hasContent && (
      <div className={styles.body}>
        <TopBanner />
        <img className={styles.snapshot} src={src} alt="snapshot" />
        {/* info */}
        <div className={styles.info}>
          <div className={styles.general}>
            <div className={styles.iconInfos}>
              <IconInfo
                icon={parental}
                width={15}
                alt="parental"
                text={content.classification.name}
              />
              <IconInfo
                icon={duration}
                alt="duration"
                text={`${content.duration} minutes`}
              />
              <IconInfo
                icon={calendar}
                alt="release year"
                text={content.year}
              />
              <IconInfo
                icon={flag}
                alt="countries"
                text={content.countries.join(', ')}
              />
              <IconInfo
                icon={info}
                alt="info"
                text={`Original title: ${content.originalTitle}`}
              />
            </div>
            {content.images.ribbons.length > 0 &&
              content.images.ribbons.map(
                ({ id, color, textColor, localizedName }) => (
                  <span
                    key={id}
                    style={{ color: textColor, backgroundColor: color }}
                    className={styles.ribbon}
                  >
                    {localizedName}
                  </span>
                )
              )}
            <p className={styles.plot}>{content.plot}</p>
            <section>
              <h5 className={styles.h5}>
                <img src={speechBubble} width="18" loading="lazy" />
                Audio and Subtitles
              </h5>
              <table className={styles.subtitles}>
                <thead>
                  <tr>
                    <td>Audio</td>
                    <td>Subtitles</td>
                  </tr>
                </thead>
                <tbody>
                  {content.languages.audio.map((audio) => (
                    <tr key={audio}>
                      <td>{audio}</td>
                      <td>{content.languages.subtitles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
          <aside className={styles.social}>
            {['seen', 'twitter', 'facebook', 'pinterest'].map((social) => (
              <div className={styles.dummy}>
                <div className={styles.circle}>
                  <img src={socials[social].icon} width="18" loading="lazy" />
                </div>
                <div className={styles.text}>{socials[social].text}</div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    )
  );
};

export default withRouter(Content);
