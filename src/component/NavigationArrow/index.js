import React from 'react';

import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';

import styles from './NavigationArrow.module';

const getScrollRight = (current) =>
  current.scrollWidth - (current.scrollLeft + current.clientWidth);

const NavigationArrow = ({
  target,
  setIsAtBeg,
  setIsAtEnd,
  position = 'left',
  type = 'content',
}) => {
  const isLeft = position === 'left';

  const handleClickLeft = () => {
    const { offsetWidth, scrollLeft } = target.current;

    setIsAtEnd(false);

    if (scrollLeft - offsetWidth <= 0) {
      setIsAtBeg(true);
    }

    target.current.scroll({
      left: scrollLeft - offsetWidth,
      behavior: 'smooth',
    });
  };

  const handleClickRight = () => {
    const { current } = target;
    const { offsetWidth, scrollLeft } = current;
    const scrollRight = getScrollRight(current);

    setIsAtBeg(false);

    if (scrollRight - offsetWidth <= 0) {
      setIsAtEnd(true);
    }

    current.scroll({
      left: scrollLeft + offsetWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={styles.arrowWrapper}
      onClick={isLeft ? handleClickLeft : handleClickRight}
    >
      <img
        className={`${isLeft ? styles.arrowLeft : styles.arrowRight} ${
          type === 'cast' && styles.cast
        }`}
        src={isLeft ? arrowLeft : arrowRight}
        alt="arrow"
        loading="lazy"
      />
    </div>
  );
};

export default NavigationArrow;
