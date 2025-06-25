export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;  // "тонкое" или "традиционное"
  size: number;
  count: number;
}