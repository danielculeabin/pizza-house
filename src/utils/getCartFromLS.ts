import { CartItem } from '../redux/cart/types';
import { recalculateTotalPrice } from './recalculateTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = recalculateTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
