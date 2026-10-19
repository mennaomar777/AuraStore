export interface WishlistProductCategory {
  _id: string;
  name: string;
  image: string;
}

export interface WishlistItem {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  category: WishlistProductCategory;
}
