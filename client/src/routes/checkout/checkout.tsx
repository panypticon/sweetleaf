import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import { useRequest } from 'ahooks';
import { ExclamationOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectGlobalData } from '../../store/slices/globalData';
import { selectAppState, resetCart } from '../../store/slices/appState';
import { modalContext } from '../../context/modalcontext';
import LoginModal from '../../components/loginmodal/loginmodal';
import SignupModal from '../../components/signupmodal/signupmodal';
import Button from '../../components/button/button';
import useCartData from '../../hooks/useCartData';
import CartItem from '../../components/cartitem/cartitem';
import Select from '../../components/select/select';
import countryOptions from '../../components/select/countryoptions';
import { postJSONData } from '../../api/fetch';

import StyledCheckout from './checkout.styled';

const Checkout = (): JSX.Element => {
    const { user } = useAppSelector(selectGlobalData);
    const { cart } = useAppSelector(selectAppState);

    const navigate = useNavigate();

    const modalData = useContext(modalContext);

    const { totalPrice, isEmpty, cartItems } = useCartData(cart);

    const [form] = Form.useForm();

    const { data, error, loading, runAsync } = useRequest(data => postJSONData('/api/v1/orders/add', data), {
        manual: true
    });

    useEffect(() => {
        isEmpty && !data && navigate('/');
    }, [isEmpty, data, navigate]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        data && dispatch(resetCart());
    }, [data, dispatch]);

    return (
        <StyledCheckout className="Checkout">
            <section className="Checkout__section">
                {
                    // Checkout
                    !data ? (
                        <>
                            <h1>Check Out Your Order</h1>
                            {!user ? (
                                // Logged out
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
                            ) : (
                                // Loggedin in
                                <div className="Checkout--cart">
                                    <Form
                                        form={form}
                                        name="checkout_data"
                                        onFinish={shippingAddress => {
                                            const items = cartItems.map(
                                                ([
                                                    _,
                                                    {
                                                        amount,
                                                        packageSize: size,
                                                        item: { id: product },
                                                        price
                                                    }
                                                ]) => ({ product, amount, size, price })
                                            );

                                            runAsync({ user: user.id, shippingAddress, items, totalPrice });
                                        }}
                                        layout="vertical"
                                        requiredMark={false}
                                        validateTrigger="onBlur"
                                        className="Checkout__form"
                                        initialValues={user.address}
                                    >
                                        <div>
                                            <h3>In Cart</h3>
                                            <ul>
                                                {cartItems.map(([id, item]) => (
                                                    <CartItem key={id} data={{ ...item, id }} showImage={true} />
                                                ))}
                                            </ul>
                                            <div className="Checkout--cart__total">
                                                <span>Total</span>
                                                <span>{`${totalPrice} €`}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3>Shipping Address</h3>
                                            <span className="Checkout__form-row">
                                                <Form.Item
                                                    name="firstName"
                                                    label="First Name"
                                                    rules={[
                                                        { required: true, message: 'First name is required' },
                                                        { max: 128, message: 'First name is too long' }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="lastName"
                                                    label="Last Name"
                                                    rules={[
                                                        { required: true, message: 'Last name is required' },
                                                        { max: 128, message: 'Last name is too long' }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </span>
                                            <Form.Item
                                                name="street"
                                                label="Street address"
                                                rules={[
                                                    { required: true, message: 'Street address is required' },
                                                    { max: 266, message: 'Street address is too long' }
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <span className="Checkout__form-row">
                                                <Form.Item
                                                    name="city"
                                                    label="City"
                                                    rules={[
                                                        { required: true, message: 'City is required' },
                                                        { max: 128, message: 'City is too long' }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="zip"
                                                    label="ZIP"
                                                    rules={[
                                                        { required: true, message: 'ZIP is required' },
                                                        { max: 32, message: 'ZIP is too long' }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </span>
                                            <Form.Item name="country" label="Country">
                                                <Select options={countryOptions} />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <h3>Payment</h3>
                                            <p>
                                                This is a demo. We don't want your money, and there are no goods to
                                                ship. ☺️
                                            </p>
                                        </div>
                                        <div className="Checkout--cart__confirm">
                                            {error && (
                                                <span className="error">
                                                    <ExclamationOutlined />
                                                    Couldn't send order, please try again
                                                </span>
                                            )}
                                            <Button type="primary" htmlType="submit" disabled={loading}>
                                                Order now for {`${totalPrice} €`}
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            )}
                        </>
                    ) : (
                        // Order sent
                        <>
                            <h1>Order Confirmed 🫡</h1>
                            <h3>#{data.id}</h3>
                            <p>If this was a real service we'd soon dispatch your leaves and gear.</p>
                            <p className="Checkout--success__buttons">
                                <Button type="primary" onClick={() => navigate('/')}>
                                    Continue shopping
                                </Button>
                                <span>or</span>
                                <Button onClick={() => navigate(`/account/${user?.id}/orders`)}>View orders</Button>
                            </p>
                        </>
                    )
                }
            </section>
        </StyledCheckout>
    );
};

export default Checkout;
