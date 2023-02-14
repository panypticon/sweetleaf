import { useState, useMemo, useEffect } from 'react';
import { Radio, Input, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import Button from '../button/button';

import type { PackageSize } from '../../types';

import StyledPackageSelector from './packageselector.styled';

const PackageSelector = ({ inventory, id }: { id: string; inventory: PackageSize[] }) => {
    const [selection, setSelection] = useState(inventory.find(item => item.amount > 0)?.size);
    const [amount, setAmount] = useState(1);

    const currentItem = useMemo(() => inventory.find(item => item.size === selection), [selection, inventory]);

    useEffect(() => {
        currentItem && amount > currentItem.amount && setAmount(currentItem.amount);
    }, [currentItem, amount]);

    return (
        <StyledPackageSelector className="PackageSelector">
            <h3>{currentItem ? `${(currentItem.price * amount).toFixed(2)} €` : 'Currently unavailable'}</h3>
            <Radio.Group defaultValue={selection} onChange={({ target: { value } }) => setSelection(value)}>
                {inventory.map(({ size, amount }, i) => (
                    <Radio.Button key={i} value={size} disabled={!amount}>
                        {size}
                    </Radio.Button>
                ))}
            </Radio.Group>
            <div>
                <Input.Group compact>
                    <Button onClick={() => setAmount(prev => prev - 1)} disabled={amount <= 1}>
                        <MinusOutlined />
                    </Button>
                    <InputNumber
                        controls={false}
                        min={1}
                        max={currentItem?.amount}
                        value={amount}
                        onChange={val => setAmount(val || 1)}
                    />
                    <Button
                        onClick={() => setAmount(prev => prev + 1)}
                        disabled={amount >= (currentItem ? currentItem.amount : true)}
                    >
                        <PlusOutlined />
                    </Button>
                </Input.Group>
                <Button type="primary">Add to cart</Button>
            </div>
        </StyledPackageSelector>
    );
};

export default PackageSelector;
