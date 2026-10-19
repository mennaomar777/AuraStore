export type OrderProduct = {
  _id?: string;
  title?: string;
  imageCover?: string;
};

export type OrderItem = {
  _id?: string;
  count: number;
  price: number;
  product?: OrderProduct | string;
};

export type Order = {
  _id: string;
  id?: string | number;
  createdAt: string;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  totalOrderPrice: number;
  shippingPrice?: number;
  taxPrice?: number;
  cartItems: OrderItem[];
  shippingAddress?: {
    details?: string;
    city?: string;
    phone?: string;
  };
};
