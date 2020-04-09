import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// components
import TopBanner from '../../component/TopBanner';
import CastList from '../../component/CastList';

// icons

import facebook from '../../images/facebook.svg';
import pinterest from '../../images/pinterest.svg';
import speechBubble from '../../images/speech-bubble.svg';
import twitter from '../../images/twitter.svg';
import view from '../../images/view.svg';

// data
import shows from '../../../static/data/shows.json';

import styles from './Show.module';

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

const LanguagesSection = ({ languages }) => (
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
        {languages.audio.map((audio) => (
          <tr key={audio}>
            <td>{audio}</td>
            <td>{languages.subtitles}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

const Show = ({ match }) => {
  const { id } = match.params;
  let show = shows[id];
  const hasShow = !!show;
  const [src, setSrc] = useState(hasShow && show.images.snapshotBlur);
  console.log('content', show);

  if (hasShow) {
    useEffect(() => {
      const timer = setTimeout(() => {
        setSrc(show.images.snapshot);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }, []);
  }

  return (
    hasShow && (
      <div className={styles.body}>
        <TopBanner />
        <img className={styles.snapshot} src={src} alt="snapshot" />
        {/* info */}
        <div className={styles.info}>
          {/* <div className={styles.general}>
            <div className={styles.iconInfos}>
              <IconInfo
                icon={parental}
                width={15}
                alt="parental"
                text={show.classification.name}
              />
              <IconInfo
                icon={duration}
                alt="episodes"
                text={`Episodes: ${show.episodes.length}`}
              />
              <IconInfo icon={calendar} alt="release year" text={show.year} />
              <IconInfo
                icon={info}
                alt="info"
                text={`Original title: ${
                  show.episodes[0] && show.episodes[0].tvShowTitle
                }`}
              />
            </div>
            {show.images.ribbons.length > 0 &&
              show.images.ribbons.map(
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
            <p className={styles.plot}>{show.plot}</p>
            <LanguagesSection languages={show.languages} />
            <section>
              <h5 className={styles.h5}>
                <img src={movieClapper} width="18" loading="lazy" />
                Director and Cast
              </h5>
              <CastList castList={show.cast} />
            </section>
          </div> */}
          <aside className={styles.social}>
            {['seen', 'twitter', 'facebook', 'pinterest'].map((social) => (
              <div key={social} className={styles.dummy}>
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

export default withRouter(Show);
