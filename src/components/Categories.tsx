import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
  getCategories: (categories: string[]) => void;
};

const categories = ['All', 'Meat', 'Vegetarian', 'BBQ', 'Spicy', 'Closed'];

const Categories: React.FC<CategoriesProps> = ({ value, getCategories, onChangeCategory }) => {
  getCategories?.(categories);

  return (
    <>
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Categories;
