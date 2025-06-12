import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>🤔</span>
      <h1>No Data Found </h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam architecto, distinctio ratione
        harum aspernatur non quod fuga saepe, aut culpa cupiditate ad maxime officiis sed quisquam,
        sit debitis voluptas odit! Earum nam, vel repellat libero iure fugit odio omnis expedita,
        animi perferendis ratione ex velit, inventore at repellendus eveniet mollitia nobis commodi
        delectus facere id natus? Quia eaque recusandae laborum.
      </p>
      <br />
    </div>
  );
};

export default NotFoundBlock;
