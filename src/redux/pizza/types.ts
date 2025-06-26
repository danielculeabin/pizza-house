import { Sort } from '../filter';

export type SortPropertyType = Sort['sortProperty']; // 'rating' | 'title' | 'price' | ...

export type SortPropertyWithoutMinus = 'rating' | 'title' | 'price';

export interface PizzaQueryParams {
  page: number;
  limit: number;
  sortBy: SortPropertyWithoutMinus; //? Используем строгий тип
  order: 'asc' | 'desc';  //? Или string, если более гибко
  category?: string | null; //? Может быть числом, null или undefined
  search?: string;  //? Может быть строкой или undefined
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface FetchPizzasArgs {
  params: PizzaQueryParams;
}

export interface PizzaItem { 
  id: string;
  title: string; 
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
}