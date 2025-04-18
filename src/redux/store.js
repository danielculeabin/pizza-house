import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slice/filterSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
  },
});

// console.log(store);  Когда что-то импортируешь - всегда проверяй что это в консоли
// Переменная 'store' - это Redux Хранилище. Вот что в этом объекте 'store' хранится:

/**
|--------------------------------------------------
•@@observable: ƒ observable()
•dispatch: (action) => {…}
•getState: ƒ getState()
•replaceReducer: ƒ replaceReducer(nextReducer)
•subscribe: subscribe(listener2) { const wrappedListener = () => {…}
•[[Prototype]]: Object

Из всего этого, нам понадобится всего-лишь 'dispatch', всё остальное на данный момент too much
|--------------------------------------------------
*/
