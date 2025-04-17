import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 🍰 Начальное состояние слайса (в переводе “кусочек”)
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'rating',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // По факту это 'actions'
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;

// type: 'filters/setCategoryId', payload: id
