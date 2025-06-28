import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
  getCategories: (categories: string[]) => void;
};

const categories = ['All', 'Meat', 'Vegetarian', 'BBQ', 'Spicy', 'Closed'];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, getCategories, onChangeCategory }) => {
    React.useEffect(() => {
      if (getCategories && typeof getCategories === 'function') {
        getCategories(categories);
      }
    }, [getCategories, categories]);

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

