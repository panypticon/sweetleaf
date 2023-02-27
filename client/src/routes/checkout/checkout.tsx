import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { selectGlobalData } from '../../store/slices/globalData';
import { selectAppState } from '../../store/slices/appState';
import { modalContext } from '../../context/modalcontext';
import LoginModal from '../../components/loginmodal/loginmodal';
import SignupModal from '../../components/signupmodal/signupmodal';
import Button from '../../components/button/button';
import useCartData from '../../hooks/useCartData';
import CartItem from '../../components/cartitem/cartitem';

import StyledCheckout from './checkout.styled';

const Checkout = (): JSX.Element => {
    const { user } = useAppSelector(selectGlobalData);
    const { cart } = useAppSelector(selectAppState);

    const navigate = useNavigate();

    const modalData = useContext(modalContext);

    const { totalPrice, isEmpty, cartItems } = useCartData(cart);

    useEffect(() => {
        isEmpty && navigate('/');
    }, [isEmpty, navigate]);

    return (
        <StyledCheckout className="Checkout">
            <section className="Checkout__section">
                <h1>Check Out Order</h1>
                {user ? (
                    <div className="Checkout--Cart">
                        <h3>Your Cart</h3>
                        <ul>
                            {cartItems.map(([id, item]) => (
                                <CartItem key={id} data={{ ...item, id }} showImage={true} />
                            ))}
                        </ul>
                        <p>{totalPrice}</p>
                    </div>
                ) : (
                    <div className="Checkout--login">
                        <h3>We're Leaflet. Who Are You?</h3>
                        <p>
                            <span>To continue, please</span>
                            <Button
                                type="primary"
                                onClick={() => modalData?.setModal(<LoginModal route="/checkout" />)}
                            >
                                <span>Log in</span>
                            </Button>
                            <span>or</span>
                            <Button onClick={() => modalData?.setModal(<SignupModal />)}>Sign up</Button>
                        </p>
                    </div>
                )}
            </section>
        </StyledCheckout>
    );
};

export default Checkout;
