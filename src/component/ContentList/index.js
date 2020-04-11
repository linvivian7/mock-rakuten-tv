import React, { useRef, useState } from 'react';

import NavigationArrow from '../NavigationArrow';

import Content from './Content';
import styles from './ContentList.module';

const ContentList = ({ contentList }) => {
  const scroll = useRef();
  const [isAtBeg, setIsAtBeg] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const shouldShowLeftArrow = !isAtBeg || isAtEnd;
  const shouldShowRightArrow = isAtBeg || !isAtEnd;

  const getArrow = (position) => (
    <NavigationArrow
      type="content"
      target={scroll}
      position={position}
      setIsAtBeg={setIsAtBeg}
      setIsAtEnd={setIsAtEnd}
    />
  );

  return (
    <section style={{ position: 'relative' }}>
      <h3 className={styles.title}>{contentList.name}</h3>
      <div className={styles.contentList} ref={scroll}>
        {contentList.content.map((content) => (
          <Content key={content.id} info={content} />
        ))}
        {shouldShowLeftArrow && getArrow('left')}
        {shouldShowRightArrow && getArrow('right')}
      </div>
    </section>
  );
};

export default ContentList;
