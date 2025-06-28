import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

export const Skeleton:React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="0" ry="0" width="227" height="0" />
    <rect x="0" y="272" rx="10" ry="10" width="251" height="21" />
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="310" rx="10" ry="10" width="249" height="88" />
    <rect x="77" y="337" rx="0" ry="0" width="7" height="9" />
    <rect x="0" y="417" rx="10" ry="10" width="85" height="36" />
    <rect x="137" y="413" rx="22" ry="22" width="109" height="45" />
  </ContentLoader>
);
