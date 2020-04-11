import React, { useRef, useState } from 'react';

import NavigationArrow from '../NavigationArrow';

import Cast from './Cast';
import styles from './CastList.module';

const CastList = ({ castList }) => {
  const scroll = useRef();
  const [isAtBeg, setIsAtBeg] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const shouldShowLeftArrow = !isAtBeg || isAtEnd;
  const shouldShowRightArrow = isAtBeg || !isAtEnd;

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
