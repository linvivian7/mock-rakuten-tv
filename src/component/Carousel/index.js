import React from 'react';
import Slider from 'react-slick';

import styles from './Carousel.module';
import carousel1 from '../../images/carousel-1.jpeg';
import carousel2 from '../../images/carousel-2.jpeg';
import carousel3 from '../../images/carousel-3.jpeg';
import carousel4 from '../../images/carousel-4.jpeg';
import carousel5 from '../../images/carousel-5.jpeg';

const images = [carousel1, carousel2, carousel3, carousel4, carousel5];

const Carousel = ({}) => {
  const settings = {
    dots: true,
    lazyLoad: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToScroll: 1,
    arrows: false,
    className: 'slick-slider-fade',
    appendDots: (dots) => <ul> {dots} </ul>,
    customPaging: () => (
      <div className="list-inner">
        <div className="button" />
      </div>
    ),
  };

  return (
    <main id="carousel" className={styles.main}>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image}>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          </div>
        ))}
      </Slider>
    </main>
  );
};

export default Carousel;
