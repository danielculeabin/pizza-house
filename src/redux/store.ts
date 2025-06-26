import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { pizza } from './pizza';
import { cart } from './cart';
import { filter } from './filter';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Глобальный тип для всех наших typescript слайсов

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
