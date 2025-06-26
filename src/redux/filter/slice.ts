import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortPropertyEnum, Sort, FilterSliceState, SetFiltersPayload } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'rating',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filter', // Обрати внимание, у тебя тут 'filters', а в selectFilter 'filter'
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<SetFiltersPayload>) {
      if (Object.keys(action.payload).length) {
        //* Важно: qs.parse возвращает строки, поэтому конвертируем в Number
        state.currentPage = Number(action.payload.currentPage || 1); // Указываем дефолт, если нет
        state.categoryId = Number(action.payload.categoryId || 0); // Указываем дефолт
        state.sort = action.payload.sort;
        state.searchValue = action.payload.searchValue || ''; // Указываем дефолт
      } else {
        state.currentPage = 1;
        state.categoryId = 0; // Внимательно: здесь было state.currentPage = 0, что, скорее всего, ошибка. Должно быть categoryId
        state.sort = {
          name: 'rating',
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
        state.searchValue = ''; // Добавил сброс searchValue при пустом payload
      }
    },
  },
});

export const { setCategoryId, setSearchValue, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
