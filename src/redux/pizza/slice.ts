import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzaItem } from './types';
import { Status } from './types';
import { fetchPizzas } from './asyncActions';

interface PizzaSliceState {
  items: PizzaItem[]; 
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, 
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload; // <--- Теперь action.payload (который PizzaItem[]) идеально подходит для state.items (который тоже PizzaItem[]).
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});



export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
