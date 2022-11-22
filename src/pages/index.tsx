import type { NextPage } from 'next';

import Cart from '@/components/cart';
import { products, productsIncludeChecked } from '@/components/cart-data';
import NewCart from '@/components/new-cart';
import NewCartIncludeChecked from '@/components/new-cart-include-checked';

const Home: NextPage = () => {
  return (
    <div>
      <Cart products={products} />
      -------
      <NewCart products={products} />
      -------
      <NewCartIncludeChecked products={productsIncludeChecked} />
    </div>
  );
};

export default Home;
