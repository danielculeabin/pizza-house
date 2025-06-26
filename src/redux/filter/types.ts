//Типизация Фильтрации Пицц
export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}

export interface SetFiltersPayload {
  currentPage: number;
  categoryId: number;
  sort: Sort;
  sortProperty?: string; // qs.parse может вернуть sortProperty как string
  searchValue?: string; // searchValue тоже может быть в параметрах URL
}