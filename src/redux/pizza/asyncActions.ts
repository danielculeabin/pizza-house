import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItem, FetchPizzasArgs } from './types';

export const fetchPizzas = createAsyncThunk<
  PizzaItem[], // 1. Возвращает МАССИВ "чертежей пицц" (PizzaItem[])
  FetchPizzasArgs, // 2. Принимает "коробку с заказом" (FetchPizzasArgs)
  { rejectValue: string } // 3. Если что-то пойдет не так, вернет "сообщение об ошибке" (string)
>('pizza/fetchPizzasStatus', 
  async (arg, {rejectWithValue}) => { 
  const { params } = arg; // <--- Здесь! TypeScript теперь ЗНАЕТ, что в `arg` есть `params`, потому что ты ему сказал через FetchPizzasArgs.
  
  // Деструктурируем напрямую из params, теперь типы известны
  const { sortBy, order, category, search, page: currentPage, limit } = params;

  try {
    // Создаем объект параметров для Axios, чтобы он был типизирован и безопасен
    const requestParams: Record<string, string | number> = {
      page: currentPage,
      limit: limit,
      sortBy: sortBy,
      order: order,
    };
    
    // Условное добавление category и search
    if (category !== null && category !== undefined && Number(category) > 0) { // Если 0 это "Все"
      requestParams.category = category;
    }
    if (search) { // Если search не пустая строка
      requestParams.search = search;
    }

    const { data } = await axios.get<PizzaItem[]>(
      `https://67e4411b2ae442db76d3b37f.mockapi.io/items`,
      {
        params: requestParams, // Axios сам преобразует это в URL-параметры
      }
    )

    return data;  // <--- TypeScript ЗНАЕТ, что data - это массив PizzaItem[], и это совпадает с тем, что ты обещал в PizzaItem[].
  } 
  catch (error: any) {// Рекомендуется типизировать как `AxiosError`
    console.error('Error fetching pizzas:', error);
    // Извлекаем сообщение об ошибке, если оно доступно
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error occured';
    alert(`Error fetching pizzas: ${errorMessage}`);
    return rejectWithValue(errorMessage); // Отклоняем thunk с сообщением об ошибке
  }
});