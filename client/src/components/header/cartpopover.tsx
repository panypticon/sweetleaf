import { useResponsive } from 'ahooks';
import { CoffeeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button';
import useCartData from '../../hooks/useCartData';
import CartItem from '../cartitem/cartitem';

import type { CartItem as CartItemType } from '../../types';

import StyledCartPopover from './cartpopover.styled';

interface Props {
    data: { [x: string]: CartItemType };
    [x: string]: any;
}

const CartPopover = (props: Props): JSX.Element => {
    const { sm } = useResponsive();

    const navigate = useNavigate();

    const { totalPrice, isEmpty, cartItems } = useCartData(props.data);

    const cartList = (
        <>
            <ul>
                {cartItems.map(([id, item]: [string, CartItemType]) => (
                    <CartItem data={{ ...item, id }} key={id} />
                ))}
            </ul>
            <div className="CartPopover__total">
                <span>Total</span>
                <span>{`${totalPrice} €`}</span>
            </div>
            <Button className="CartPopover__checkout" type="primary" wide onClick={() => navigate('/checkout')}>
                Check out
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
            // Ant 5.3.0+ seems to ignore align without offering an alternative
            // align={{ offset: [isEmpty ? 8 : -14, 4] }}
            {...props}
        />
    );
};

export default CartPopover;
