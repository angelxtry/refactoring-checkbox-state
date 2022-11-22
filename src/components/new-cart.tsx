import { NextPage } from 'next';
import { ChangeEvent, useRef, useState } from 'react';

import { Product } from '@/types/product.type';

interface NewCartProps {
  products: Product[];
}
const NewCart: NextPage<NewCartProps> = ({ products }) => {
  const [checkedIds, setCheckedIds] = useState(new Set<number>());
  const topCheckBox = useRef<HTMLInputElement>(null);
  const checkedProductsCount = checkedIds.size;

  const handleTopCheckBox = (checkedCount: number) => {
    if (!topCheckBox.current) {
      return;
    }

    topCheckBox.current.indeterminate =
      checkedCount < products.length && checkedCount > 0;
  };

  const handleOnChangeCheckBox = (id: number) => {
    const newCheckedIds = new Set(checkedIds);
    if (newCheckedIds.has(id)) {
      newCheckedIds.delete(id);
    } else {
      newCheckedIds.add(id);
    }
    setCheckedIds(newCheckedIds);

    handleTopCheckBox(newCheckedIds.size);
  };

  const handleSelectDeselectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target) {
      return;
    }

    if (event.target.checked) {
      const allChecked = new Set(products.map(({ key }) => key));
      setCheckedIds(allChecked);
    } else {
      setCheckedIds(new Set());
    }
  };

  return (
    <div>
      <div>
        <label>
          <input
            type='checkbox'
            ref={topCheckBox}
            checked={products.length === checkedProductsCount}
            onChange={handleSelectDeselectAll}
          />
          {checkedProductsCount ? `Selected ${checkedProductsCount}` : 'None selected'}
        </label>
      </div>
      <div>
        {products.map(({ key, name }) => (
          <div key={key}>
            <label>
              <input
                type='checkbox'
                checked={checkedIds.has(key)}
                onChange={() => handleOnChangeCheckBox(key)}
              />
              {name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCart;
