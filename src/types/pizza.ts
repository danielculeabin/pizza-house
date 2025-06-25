import { Sort } from '../types/filter';

export type SortPropertyType = Sort['sortProperty']; // 'rating' | 'title' | 'price' | ...

// Это для "dispatch(pizzas({params: sortBy ..." (Home.tsx) БЕЗ минуса
export type SortPropertyWithoutMinus = 'rating' | 'title' | 'price';

export interface PizzaQueryParams {
  page: number;
  limit: number;
  sortBy: SortPropertyWithoutMinus; //? Используем строгий тип
  order: 'asc' | 'desc';  //? Или string, если более гибко
  category?: number | null; //? Может быть числом, null или undefined
  search?: string;  //? Может быть строкой или undefined
}

// Тип для аргумента, который передается в fetchPizzas (payload thunk'а)
export interface FetchPizzasArgs {
  params: PizzaQueryParams;
}

// Тип для одного элемента пиццы, который возвращает API
// ЭТО ТИП ДЛЯ ПИЦЦЫ ИЗ КАТАЛОГА (ТОЧНО КАК В API)
export interface PizzaItem { // Можно просто назвать PizzaItem
  id: string;
  title: string; // <-- Вот оно, точно как в твоем API!
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
}