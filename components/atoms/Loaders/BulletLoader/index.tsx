import React from 'react';
import styles from './BulletLoader.module.css'; // Create a CSS module for styling

const BulletLoader = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.bulletLoader}>
      <div className={styles.bullet}></div>
      <div className={styles.bullet}></div>
      <div className={styles.bullet}></div>
    </div>
  );
};

export default BulletLoader; 