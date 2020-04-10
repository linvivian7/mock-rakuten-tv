import React from 'react';

// components
import CastList from '../CastList';

// icons
import calendar from '../../images/calendar.svg';
import duration from '../../images/duration.svg';
import flag from '../../images/flag.svg';
import info from '../../images/info.svg';
import movieClapper from '../../images/movie-clapper.svg';
import parental from '../../images/parental.svg';
import speechBubble from '../../images/speech-bubble.svg';

import styles from './General.module';

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

const General = ({ content }) => (
  <div className={styles.general}>
    <div className={styles.iconInfos}>
      <IconInfo
        icon={parental}
        width={15}
        alt="parental"
        text={content.classification.name}
      />
      {content.duration && (
        <IconInfo
          icon={duration}
          alt="duration"
          text={`${content.duration} minutes`}
        />
      )}
      {content.episodes && (
        <IconInfo
          icon={duration}
          alt="episodes"
          text={`Episodes: ${content.episodes && content.episodes.length}`}
        />
      )}
      <IconInfo icon={calendar} alt="release year" text={content.year} />
      {content.countries && (
        <IconInfo
          icon={flag}
          alt="countries"
          text={content.countries.join(', ')}
        />
      )}
      <IconInfo
        icon={info}
        alt="info"
        text={`Original title: ${content.originalTitle}`}
      />
    </div>
    {content.images.ribbons.length > 0 &&
      content.images.ribbons.map(({ id, color, textColor, localizedName }) => (
        <span
          key={id}
          style={{
            color: textColor ? textColor : 'white',
            backgroundColor: color,
          }}
          className={styles.ribbon}
        >
          {localizedName}
        </span>
      ))}
    <p className={styles.plot}>{content.plot}</p>
    <LanguagesSection languages={content.languages} />
    <section>
      <h5 className={styles.h5}>
        <img src={movieClapper} width="18" loading="lazy" />
        Director and Cast
      </h5>
      <CastList castList={content.cast} />
    </section>
  </div>
);

export default General;
