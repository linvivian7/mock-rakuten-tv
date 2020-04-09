import React, { useRef, useState } from 'react';

import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';

import Cast from './Cast';
import styles from './CastList.module';

const CastList = ({ castList }) => {
  const cast = useRef();
  const [isAtBeg, setIsAtBeg] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const onClickLeft = () => {
    if (isAtEnd) {
      setIsAtEnd(false);
    }

    cast.current.scrollLeft -= window.innerWidth;
  };

  const onClickRight = () => {
    setIsAtBeg(false);
    const windowWidth = window.innerWidth;
    const offsetWidth = cast.current.offsetWidth;
    const scrollLeft = cast.current.scrollLeft;
    const scrollWidth = cast.current.scrollWidth;

    if (offsetWidth + scrollLeft >= scrollWidth) {
      setIsAtEnd(true);
      cast.current.scrollLeft += offsetWidth;
    } else {
      cast.current.scrollLeft += offsetWidth;
    }
  };

  return (
    <section style={{ position: 'relative' }}>
      <h3 className={styles.title}>{castList.name}</h3>
      <div className={styles.cast} ref={cast}>
        {castList.map(({ isDirector, name, photo }) => (
          <Cast key={name} name={name} isDirector={isDirector} photo={photo} />
        ))}
        {!isAtBeg > 0 && (
          <img
            className={styles.arrowLeft}
            src={arrowLeft}
            alt="arrow"
            loading="lazy"
            onClick={onClickLeft}
          />
        )}
        {!isAtEnd && (
          <div className="wrapper">
            <img
              className={styles.arrowRight}
              src={arrowRight}
              alt="arrow"
              loading="lazy"
              onClick={onClickRight}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CastList;
