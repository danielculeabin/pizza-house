import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Skeleton, Categories, Sort, PizzaBlock, Pagination } from '../components';

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
  setSort,
} from '../redux/slice/filterSlice';
import { Sort as SortItem, SetFiltersPayload, FilterSliceState } from '../types/filter';

import { fetchPizzas, selectPizzaData } from '../redux/slice/pizzaSlice';
import { sortList } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
import { PizzaQueryParams, SortPropertyWithoutMinus, FetchPizzasArgs } from '../types/pizza';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Запрос пицц
  const getPizzas = async () => {
    const sortBy: SortPropertyWithoutMinus = sort.sortProperty.replace(
      '-',
      '',
    ) as SortPropertyWithoutMinus;
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? categoryId : null;
    const search = searchValue;

    dispatch(
      fetchPizzas({
        params: {
          sortBy,
          order,
          page: currentPage,
          limit: 4,
          ...(category !== null && { category }),
          ...(searchValue && { search: searchValue }),
        },
      }),
    );

    window.scrollTo(0, 0);
  };

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

    //TODO---------------------------------------
    // Узнать надо ли это делать?
    if (!window.location.search){
      dispatch(fetchPizzas({} as FetchPizzasArgs));
    }

  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((obj: any) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory}
          getCategories={() => {}}
        />
        <Sort value={sort} onChangeSort={(i) => dispatch(setSort(i))} />
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
