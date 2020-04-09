import React, { useRef, useState } from 'react';

import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';

import Movie from './Movie';
import styles from './List.module';

const List = ({ movieList }) => {
  const movies = useRef();
  const [isAtBeg, setIsAtBeg] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const onClickLeft = () => {
    if (isAtEnd) {
      setIsAtEnd(false);
    }

    movies.current.scrollLeft -= window.innerWidth;
  };

  const onClickRight = () => {
    setIsAtBeg(false);
    const windowWidth = window.innerWidth;
    const offsetWidth = movies.current.offsetWidth;
    const scrollLeft = movies.current.scrollLeft;
    const scrollWidth = movies.current.scrollWidth;

    if (offsetWidth + scrollLeft >= scrollWidth) {
      setIsAtEnd(true);
      movies.current.scrollLeft += offsetWidth;
    } else {
      movies.current.scrollLeft += offsetWidth;
    }
  };

  return (
    <section style={{ position: 'relative' }}>
      <h3 className={styles.title}>{movieList.name}</h3>
      <div className={styles.movies} ref={movies}>
        {movieList.movies.map((movie) => (
          <Movie key={movie.id} info={movie} />
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

export default List;
