import React, { useRef, useEffect, useState } from 'react';

import NavigationArrow from '../NavigationArrow';

import Cast from './Cast';
import styles from './CastList.module';

const getScrollRight = (current) =>
  current.scrollWidth - (current.scrollLeft + current.clientWidth);

// Hook
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

const CastList = ({ castList }) => {
  const scroll = useRef();
  const size = useWindowSize();
  const [isAtBeg, setIsAtBeg] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const shouldShowLeftArrow = !isAtBeg;
  const shouldShowRightArrow = !isAtEnd;

  useEffect(() => {
    const { scrollLeft } = scroll.current;

    setIsAtEnd(getScrollRight(scroll.current) === 0);
    setIsAtBeg(scrollLeft === 0);
  }, [size]);

  const getArrow = (position) => (
    <NavigationArrow
      type="cast"
      target={scroll}
      position={position}
      setIsAtBeg={setIsAtBeg}
      setIsAtEnd={setIsAtEnd}
    />
  );

  return (
    <section style={{ position: 'relative' }}>
      <h3 className={styles.title}>{castList.name}</h3>
      <div className={styles.cast} ref={scroll}>
        {castList.map(({ isDirector, name, photo }) => (
          <Cast
            key={`${name}${isDirector && '-director'}`}
            name={name}
            isDirector={isDirector}
            photo={photo}
          />
        ))}
        {shouldShowLeftArrow && getArrow('left')}
        {shouldShowRightArrow && getArrow('right')}
      </div>
    </section>
  );
};

export default CastList;
