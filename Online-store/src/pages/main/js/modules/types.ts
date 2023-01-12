export interface LocalStorageItem {
  id: number;
  price: number;
  count: number;
}

export interface DummyItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

export interface FetchResponce {
  products: Array<DummyItem>;
  total: number;
  skip: number;
  limit: number;
}

export interface urlParams {
  id: number;
}
