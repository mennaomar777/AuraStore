export interface ProductCategory {
  name: string;
  image: string;
}

export interface CartProduct {
  title: string;
  imageCover: string;
  quantity: number;
  category: ProductCategory;
  _id: string;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface CartCardsProps {
  cartItems: CartItem[];
  cartId: string;
}
