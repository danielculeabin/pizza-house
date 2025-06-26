import { CartItem } from '../redux/cart/types';
const recalculateTotalPrice = (items: CartItem[]) =>
  Math.round(items.reduce((sum, item) => item.price * item.count + sum, 0) * 100) / 100;

export default recalculateTotalPrice;
