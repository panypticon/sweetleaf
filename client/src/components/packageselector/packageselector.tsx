import { useState, useMemo, useEffect } from 'react';
import { Radio, Input, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons';

import Button from '../button/button';

import type { PackageSize } from '../../types';

import StyledPackageSelector from './packageselector.styled';

const PackageSelector = ({
    inventory,
    onAddToCart
}: {
    inventory: PackageSize[];
    onAddToCart: (amount: number, packageSize: string) => void;
}) => {
    const [selection, setSelection] = useState(inventory.find(item => item.amount > 0)?.size);
    const [amount, setAmount] = useState(1);
    const [showAdded, setShowAdded] = useState(false);

    const currentItem = useMemo(() => inventory.find(item => item.size === selection), [selection, inventory]);

    useEffect(() => {
        currentItem && amount > currentItem.amount && setAmount(currentItem.amount);
    }, [currentItem, amount]);

    useEffect(() => {
        showAdded && setTimeout(() => setShowAdded(false), 1500);
    }, [showAdded]);

    return (
        <StyledPackageSelector className="PackageSelector">
            <span className="PackageSelector__price">
                <h3>{currentItem ? `${(currentItem.price * amount).toFixed(2)} €` : 'Currently unavailable'}</h3>
            </span>
            <div className="PackageSelector__config">
                <Radio.Group defaultValue={selection} onChange={({ target: { value } }) => setSelection(value)}>
                    {inventory.map(({ size, amount }, i) => (
                        <Radio.Button key={i} value={size} disabled={!amount}>
                            {size}
                        </Radio.Button>
                    ))}
                </Radio.Group>
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
            </div>
            <div className="PackageSelector__add">
                <Button
                    type="primary"
                    onClick={() => {
                        onAddToCart(amount, currentItem?.size || '');
                        setShowAdded(true);
                    }}
                >
                    Add to cart
                </Button>
                <span className={showAdded ? 'show' : ''}>
                    <CheckOutlined />
                    Product added
                </span>
            </div>
        </StyledPackageSelector>
    );
};

export default PackageSelector;
