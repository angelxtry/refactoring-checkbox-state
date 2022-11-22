import { NextPage } from 'next';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { ProductIncludeChecked } from '@/types/product.type';

interface NewCartIncludeCheckedProps {
  products: ProductIncludeChecked[];
}
const NewCartIncludeChecked: NextPage<NewCartIncludeCheckedProps> = ({ products }) => {
  const [checkedIds, setCheckedIds] = useState(
    new Set<number>(products.filter(({ checked }) => checked).map(({ key }) => key)),
  );
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

  useEffect(() => {
    handleTopCheckBox(checkedIds.size);
  }, [checkedIds]);

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
        {products.map((product) => (
          <div key={product.key}>
            <label>
              <input
                type='checkbox'
                checked={checkedIds.has(product.key)}
                onChange={() => handleOnChangeCheckBox(product.key)}
              />
              {product.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCartIncludeChecked;
