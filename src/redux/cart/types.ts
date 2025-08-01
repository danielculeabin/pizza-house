export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;  // "thin" or "traditional"
  size: number;
  count: number;
}

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

