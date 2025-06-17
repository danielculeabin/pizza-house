import React from 'react';
import NotFoundBlock from '../components/NotFoundBlock';
const NotFound: React.FC = () => {
  return (
    <>
      <NotFoundBlock />
      <div>
        <h3>Head over to main menu!</h3>
      </div>
      <button>
        <b>Main Page</b>
      </button>
    </>
  );
};

export default NotFound;
