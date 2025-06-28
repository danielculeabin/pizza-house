import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Skeleton, Categories, Sort, PizzaBlock, Pagination } from '../components';

import { selectFilter } from '../redux/filter/selectors'
import { setCategoryId, setCurrentPage, setFilters, setSort } from '../redux/filter/slice';

import { Sort as SortItem, SetFiltersPayload } from '../redux/filter';

import {fetchPizzas} from '../redux/pizza/asyncActions'
import {selectPizzaData } from '../redux/pizza';
import { sortList } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
import { SortPropertyWithoutMinus } from '../redux/pizza';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  import("../utils/math").then(math => {
    console.log(math.add(33333, 66666));
  })

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = React.useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, []);

  const onChangeSort = React.useCallback(
    (i: SortItem) => {
      dispatch(setSort(i));
    },
    [dispatch],
  );

  const emptyCallBack = React.useCallback(() => {}, []);

  // Запрос пицц - эта функция вызывается из useEffect
  const getPizzas = React.useCallback(async () => {
    const sortBy: SortPropertyWithoutMinus = sort.sortProperty.replace(
      '-',
      '',
    ) as SortPropertyWithoutMinus;
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;

    dispatch(
      fetchPizzas({
        params: {
          sortBy,
          order,
          page: currentPage,
          limit: 4,
          ...(category && { category }),
          ...(search && { search }),
        },
      }),
    );

    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage, searchValue]);

  // Чтение URL и установка фильтров
  React.useEffect(() => {
    if (window.location.search) {
      // Парсим строку запроса. qs.parse() возвращает объект с string-значениями.
      const params = qs.parse(window.location.search.substring(1)) as {
        sortBy?: string;
        order?: string;
        categoryId?: string;
        search?: string;
        currentPage?: string;
      };
      // Находим объект сортировки, соответствующий параметру из URL
      const foundSort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      // Формируем payload для setFilters
      const payloadToSet: SetFiltersPayload = {
        categoryId: params.categoryId ? Number(params.categoryId) : 0,
        currentPage: params.currentPage ? Number(params.currentPage) : 1,
        searchValue: params.search || '',
        sort: foundSort || sortList[0],
      };

      dispatch(setFilters(payloadToSet)); // Передаем полностью сформированный объект
      isSearch.current = true;
    }
  }, []); // Зависимости: пустой массив, чтобы запустился один раз при монтировании

  // Запрос пицц после установки фильтров
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Сохранение параметров в URL
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => (
    //<Link key={obj.id} to={`/pizza/${obj.id}`}>
    <PizzaBlock key={obj.id} {...obj} />
    // </Link>
  ));

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory}
          getCategories={emptyCallBack}
        />
        <Sort value={sort} onChangeSort={onChangeSort} />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Error Occured <span>😕</span>
          </h2>
          <p>
            Sorry, couldn't load the pizzas...
            <br />
            Try again later !
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
