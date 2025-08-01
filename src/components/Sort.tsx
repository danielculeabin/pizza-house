import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSort } from '../redux/filter';
import { setSort } from '../redux/filter/slice';
import { Sort as SortType, SortPropertyEnum } from '../redux/filter';
import { useWhyDidYouUpdate } from 'ahooks';

type SortProps = {
  value: SortType;
  onChangeSort: (i: SortType) => void;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortList: SortType[] = [
  { name: 'rating (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'rating (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'price (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'price (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'title (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'title (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

export const Sort: React.FC<SortProps> = React.memo(({ value, onChangeSort }) => {
  const dispatch = useDispatch();
  const currentSort: SortType = useSelector(selectSort);

  useWhyDidYouUpdate('Sort: ', { value });

  const sortRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortType) => {
    dispatch(setSort(obj)); 
    setOpen(false); 
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Sort by:</b>
          <span onClick={() => setOpen(!open)}>{value.name}</span>
        </div>
        {open && (
          <div className="sort__popup">
            <ul>
              {sortList.map((obj, i) => (
                <li
                  key={i}
                  onClick={() => onClickListItem(obj)}
                  className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                  {obj.name}
                </li>
              )) || <li>No list available</li>}
            </ul>
          </div>
        )}
      </div>
    </>
  );
});

export default Sort;
