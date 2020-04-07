import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';
import styles from './TopBanner.module';

const TopBanner = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <div className={styles.logo}>
          <img src={logo} width="122" alt="RakutenTV" loading="lazy" />
        </div>
      </Link>
      <ul className={styles.links}>
        <li>
          <Link className={styles.link} to="/box-office">
            BOX OFFICE
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/free">
            FREE
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/subscription">
            SUBSCRIPTION
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopBanner;
