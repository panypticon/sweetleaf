import { useMemo } from 'react';
import { useResponsive } from 'ahooks';
import { PlusCircleFilled, MinusCircleFilled, CoffeeOutlined } from '@ant-design/icons';

import { useAppDispatch } from '../../store/hooks';
import Button from '../button/button';
import { incrementInCart, decrementInCart } from '../../store/slices/appState';

import type { CartItem } from '../../types';

import StyledCartPopover from './cartpopover.styled';

interface Props {
    data: { [x: string]: CartItem };
    [x: string]: any;
}

const CartPopoverItem = ({
    data: {
        amount,
        packageSize,
        id,
        item: { name, inventory }
    }
}: {
    data: CartItem;
}): JSX.Element => {
    const price = useMemo(
        () => inventory.find(item => item.size === packageSize)?.price || 0,
        [inventory, packageSize]
    );

    const dispatch = useAppDispatch();

    return (
        <li className="CartPopoverItem">
            <h6>{name}</h6>
            <div className="CartPopoverItem__specs">
                <span className="CartPopoverItem__amount">
                    <MinusCircleFilled onClick={() => id && dispatch(decrementInCart(id))} />
                    <span>{amount}</span>
                    <PlusCircleFilled onClick={() => id && dispatch(incrementInCart(id))} />
                </span>
                <span className="CartPopoverItem__packagesize">{packageSize}</span>
                <span className="CartPopoverItem__price">{`${(price * amount).toFixed(2)} €`}</span>
            </div>
        </li>
    );
};

const CartPopover = (props: Props): JSX.Element => {
    const { sm } = useResponsive();

    const totalPrice = Object.values(props.data)
        .reduce(
            (acc, item) =>
                acc + item.amount * (item.item.inventory.find(size => size.size === item.packageSize)?.price || 0),
            0
        )
        .toFixed(2);

    const isEmpty = Object.keys(props.data).length === 0;

    const cartList = (
        <>
            <ul>
                {Object.entries(props.data).map(([id, item]: [string, CartItem]) => (
                    <CartPopoverItem data={{ ...item, id }} key={id} />
                ))}
            </ul>
            <div className="CartPopover__total">
                <span>Total</span>
                <span>{`${totalPrice} €`}</span>
            </div>
            <Button className="CartPopover__checkout" type="primary" wide>
                Checkout
            </Button>
        </>
    );

    const cartEmpty = (
        <p className="CartPopover__empty">
            <CoffeeOutlined />
            <span>As empty as your cup - fill it!</span>
        </p>
    );

    return (
        <StyledCartPopover
            overlayClassName="CartPopover"
            title={<h5>Cart</h5>}
            placement={sm ? 'bottomRight' : 'bottom'}
            content={isEmpty ? cartEmpty : cartList}
            getPopupContainer={() => document.querySelector('.Header .Header__actions')}
            destroyTooltipOnHide={false}
            align={{ offset: [isEmpty ? 8 : -14, 4] }}
            {...props}
        />
    );
};

export default CartPopover;
