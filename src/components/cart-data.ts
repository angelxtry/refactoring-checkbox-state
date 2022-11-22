import { Product, ProductIncludeChecked } from '@/types/product.type';

export const products: Product[] = [
  { key: 1, name: 'banana' },
  { key: 2, name: 'apple' },
];

export const productsIncludeChecked: ProductIncludeChecked[] = [
  { key: 1, name: 'banana', checked: false },
  { key: 2, name: 'apple', checked: true },
];
