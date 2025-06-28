import React from 'react';
import {NotFoundBlock} from '../components';
import { Link } from 'react-router-dom';
const NotFound: React.FC = () => {
  return (
    <div className="container pizza-block">
      <NotFoundBlock />
      <h3>Head over to main menu!</h3>
      <br />
      <Link to="/" className="button button--outline button--add go-back-btn">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
        </svg>
        <span>Main Page</span>
      </Link>
    </div>
  );
};

export default NotFound;
