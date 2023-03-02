import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';

import { useAppDispatch } from '../../store/hooks';
import { decrementInCart, incrementInCart } from '../../store/slices/appState';

import type { CartItem as CartItemType } from '../../types';

import StyledCartItem from './cartitem.styled';

const CartItem = ({
    data: {
        amount,
        packageSize,
        id,
        item: { name, image },
        price
    },
    showImage = false
}: {
    data: CartItemType;
    showImage?: boolean;
}): JSX.Element => {
    const dispatch = useAppDispatch();

    return (
        <StyledCartItem className="CartItem">
            {showImage && image && <img src={image} alt={name} />}
            <span>
                <h6>{name}</h6>
                <div className="CartItem__specs">
                    <span className="CartItem__amount">
                        <MinusCircleFilled onClick={() => id && dispatch(decrementInCart(id))} />
                        <span>{amount}</span>
                        <PlusCircleFilled onClick={() => id && dispatch(incrementInCart(id))} />
                    </span>
                    <span className="CartItem__packagesize">{packageSize}</span>
                    <span className="CartItem__price">{`${price.toFixed(2)} €`}</span>
                </div>
            </span>
        </StyledCartItem>
    );
};

export default CartItem;
