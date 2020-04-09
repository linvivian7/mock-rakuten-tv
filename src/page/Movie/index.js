import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// components
import TopBanner from '../../component/TopBanner';
import CastList from '../../component/CastList';

// icons
import calendar from '../../images/calendar.svg';
import duration from '../../images/duration.svg';
import facebook from '../../images/facebook.svg';
import flag from '../../images/flag.svg';
import info from '../../images/info.svg';
import movieClapper from '../../images/movie-clapper.svg';
import parental from '../../images/parental.svg';
import pinterest from '../../images/pinterest.svg';
import speechBubble from '../../images/speech-bubble.svg';
import starBlack from '../../images/star-black.svg';
import twitter from '../../images/twitter.svg';
import user from '../../images/user.svg';
import view from '../../images/view.svg';

// data
import movies from '../../../static/data/movies.json';

import styles from './Movie.module';

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

const Movie = ({ match }) => {
  const { id } = match.params;
  let movie = movies[id];
  const hasMovie = !!movie;
  const [src, setSrc] = useState(hasMovie && movie.images.snapshotBlur);
  console.log('content', movie);

  if (hasMovie) {
    useEffect(() => {
      const timer = setTimeout(() => {
        setSrc(movie.images.snapshot);
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }, []);
  }

  return (
    hasMovie && (
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
                text={movie.classification.name}
              />
              <IconInfo
                icon={duration}
                alt="duration"
                text={`${movie.duration} minutes`}
              />
              <IconInfo icon={calendar} alt="release year" text={movie.year} />
              <IconInfo
                icon={flag}
                alt="countries"
                text={movie.countries.join(', ')}
              />
              <IconInfo
                icon={info}
                alt="info"
                text={`Original title: ${movie.originalTitle}`}
              />
            </div>
            {movie.images.ribbons.length > 0 &&
              movie.images.ribbons.map(
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
            <p className={styles.plot}>{movie.plot}</p>
            <LanguagesSection languages={movie.languages} />
            <section>
              <h5 className={styles.h5}>
                <img src={movieClapper} width="18" loading="lazy" />
                Director and Cast
              </h5>
              <CastList castList={movie.cast} />
            </section>
          </div>
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

export default withRouter(Movie);
