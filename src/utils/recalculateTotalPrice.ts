import { CartItem } from '../redux/cart/types';
export const recalculateTotalPrice = (items: CartItem[]) =>
  Math.round(items.reduce((sum, item) => item.price * item.count + sum, 0) * 100) / 100;
