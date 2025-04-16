import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 🍰 Начальное состояние слайса (в переводе “кусочек”)
  categoryId: 0,
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
      // console.log('action setCategoryId', action);
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      // console.log('action setSort', action);
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;

// type: 'filters/setCategoryId', payload: id
