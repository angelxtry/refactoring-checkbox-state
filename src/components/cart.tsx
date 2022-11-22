import { NextPage } from 'next';
import { ChangeEvent, useRef, useState } from 'react';

import { Product } from '@/types/product.type';

interface CheckState {
  checked: boolean;
}

interface CartProps {
  products: Product[];
}
const Cart: NextPage<CartProps> = ({ products }) => {
  const [checkedState, setCheckedState] = useState<CheckState[]>(
    new Array(products.length).fill({ checked: false }),
  );
  const [checkBoxSelectedCount, setCheckBoxSelectedCount] = useState(0);
  const topCheckBox = useRef<HTMLInputElement>(null);

  const handleTopCheckBox = (checkedCount: number) => {
    if (!topCheckBox.current) {
      return;
    }

    topCheckBox.current.indeterminate =
      checkedCount < products.length && checkedCount > 0;
  };

  const handleOnChangeCheckBox = (position: number) => {
    const newCheckBoxState = checkedState.map(({ checked }, index) => {
      return position === index ? { checked: !checked } : { checked };
    });
    setCheckedState(newCheckBoxState);

    const selectedCount = newCheckBoxState.filter(({ checked }) => checked).length;
    setCheckBoxSelectedCount(selectedCount);
    handleTopCheckBox(selectedCount);
  };

  const handleSelectDeselectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target) {
      return;
    }

    if (event.target.checked) {
      setCheckedState(new Array(products.length).fill({ checked: true }));
      setCheckBoxSelectedCount(products.length);
    } else {
      setCheckedState(new Array(products.length).fill({ checked: false }));
      setCheckBoxSelectedCount(0);
    }
  };

  return (
    <div>
      <div>
        <label>
          <input
            type='checkbox'
            ref={topCheckBox}
            checked={products.length === checkBoxSelectedCount}
            onChange={handleSelectDeselectAll}
          />
          {checkBoxSelectedCount ? `Selected ${checkBoxSelectedCount}` : 'None selected'}
        </label>
      </div>
      <div>
        {products.map(({ key, name }, index) => (
          <div key={key}>
            <label>
              <input
                type='checkbox'
                checked={checkedState[index].checked}
                onChange={() => handleOnChangeCheckBox(index)}
              />
              {name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
