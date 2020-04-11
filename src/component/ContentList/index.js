import React, { useRef, useState } from 'react';

import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';

import Content from './Content';
import styles from './ContentList.module';

const getScrollRight = (current) =>
  current.scrollWidth - (current.scrollLeft + current.clientWidth);

const ContentList = ({ contentList }) => {
  const scroll = useRef();
  const [isAtBeg, setIsAtBeg] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const shouldShowLeftArrow = !isAtBeg || isAtEnd;
  const shouldShowRightArrow = isAtBeg || !isAtEnd;

  const onClickLeft = () => {
    const { offsetWidth, scrollLeft } = scroll.current;

    setIsAtEnd(false);

    if (scrollLeft - offsetWidth <= 0) {
      setIsAtBeg(true);
    }

    scroll.current.scroll({
      left: scrollLeft - offsetWidth,
      behavior: 'smooth',
    });
  };

  const onClickRight = () => {
    const { offsetWidth, scrollLeft } = scroll.current;
    const scrollRight = getScrollRight(scroll.current);

    setIsAtBeg(false);

    if (scrollRight - offsetWidth <= 0) {
      setIsAtEnd(true);
    }

    scroll.current.scroll({
      left: scrollLeft + offsetWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section style={{ position: 'relative' }}>
      <h3 className={styles.title}>{contentList.name}</h3>
      <div className={styles.contentList} ref={scroll}>
        {contentList.content.map((content) => (
          <Content key={content.id} info={content} />
        ))}
        {shouldShowLeftArrow > 0 && (
          <div className={styles.arrowWrapper} onClick={onClickLeft}>
            <img
              className={styles.arrowLeft}
              src={arrowLeft}
              alt="arrow"
              loading="lazy"
            />
          </div>
        )}
        {shouldShowRightArrow && (
          <div className={styles.arrowWrapper} onClick={onClickRight}>
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
