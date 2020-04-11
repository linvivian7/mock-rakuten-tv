import React, { useRef, useState } from 'react';

import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';

import Content from './Content';
import styles from './ContentList.module';

const ContentList = ({ contentList }) => {
  const content = useRef();
  const [isAtBeg, setIsAtBeg] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const onClickLeft = () => {
    if (isAtEnd) {
      setIsAtEnd(false);
    }

    content.current.scrollLeft -= window.innerWidth;
  };

  const onClickRight = () => {
    setIsAtBeg(false);
    const windowWidth = window.innerWidth;
    const offsetWidth = content.current.offsetWidth;
    const scrollLeft = content.current.scrollLeft;
    const scrollWidth = content.current.scrollWidth;

    if (offsetWidth + scrollLeft >= scrollWidth) {
      setIsAtEnd(true);
      content.current.scrollLeft += offsetWidth;
    } else {
      content.current.scrollLeft += offsetWidth;
    }
  };

  return (
    <section style={{ position: 'relative' }}>
      <h3 className={styles.title}>{contentList.name}</h3>
      <div className={styles.contentList} ref={content}>
        {contentList.content.map((content) => (
          <Content key={content.id} info={content} />
        ))}
        {!isAtBeg > 0 && (
          <div className={styles.arrowLeft} onClick={onClickLeft}>
            <img
              className={styles.arrowLeft}
              src={arrowLeft}
              alt="arrow"
              loading="lazy"
            />
          </div>
        )}
        {!isAtEnd && (
          <div className={styles.arrowRight} onClick={onClickRight}>
            <img
              className={styles.arrowRight}
              src={arrowRight}
              alt="arrow"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentList;
