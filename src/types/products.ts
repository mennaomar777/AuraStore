import { SubCategory } from "@/types/categories";
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Review {
  createdAt: string;
  product: string; // product id
  rating: number;
  review: string;
  updatedAt: string;
  user: { _id: string; name: string };
  __v: number;
  _id: string;
}

export interface Product {
  _id: string;
  id: string;

  title: string;
  slug: string;
  description: string;

  quantity: number;
  sold?: number;

  price: number;
  priceAfterDiscount?: number;

  imageCover: string;
  images: string[];

  ratingsAverage: number;
  ratingsQuantity: number;

  createdAt: string;
  updatedAt: string;

  category: Category;
  subcategory: SubCategory[];
  brand: Brand;
  reviews: Review[];
}

export type ProductsResponse = Product[];
