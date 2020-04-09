import React from 'react';

// icons
import facebook from '../../images/facebook.svg';
import pinterest from '../../images/pinterest.svg';
import twitter from '../../images/twitter.svg';
import view from '../../images/view.svg';

import styles from './Social.module';

const socials = {
  seen: {
    icon: view,
    text: 'Mark as Seen',
  },
  facebook: {
    icon: facebook,
    text: 'Facebook',
  },
  twitter: {
    icon: twitter,
    text: 'Twitter',
  },
  pinterest: {
    icon: pinterest,
    text: 'Pinterest',
  },
};

const Social = () => (
  <aside className={styles.social}>
    {['seen', 'twitter', 'facebook', 'pinterest'].map((social) => (
      <div key={social} className={styles.dummy}>
        <div className={styles.circle}>
          <img src={socials[social].icon} width="18" loading="lazy" />
        </div>
        <div className={styles.text}>{socials[social].text}</div>
      </div>
    ))}
  </aside>
);

export default Social;
