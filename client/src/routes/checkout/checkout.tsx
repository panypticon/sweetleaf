import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';

import { useAppSelector } from '../../store/hooks';
import { selectGlobalData } from '../../store/slices/globalData';
import { selectAppState } from '../../store/slices/appState';
import { modalContext } from '../../context/modalcontext';
import LoginModal from '../../components/loginmodal/loginmodal';
import SignupModal from '../../components/signupmodal/signupmodal';
import Button from '../../components/button/button';
import useCartData from '../../hooks/useCartData';
import CartItem from '../../components/cartitem/cartitem';
import Select from '../../components/select/select';
import countryOptions from '../../components/select/countryoptions';

import StyledCheckout from './checkout.styled';

const Checkout = (): JSX.Element => {
    const { user } = useAppSelector(selectGlobalData);
    const { cart } = useAppSelector(selectAppState);

    const navigate = useNavigate();

    const modalData = useContext(modalContext);

    const { totalPrice, isEmpty, cartItems } = useCartData(cart);

    const [form] = Form.useForm();

    useEffect(() => {
        isEmpty && navigate('/');
    }, [isEmpty, navigate]);

    return (
        <StyledCheckout className="Checkout">
            <section className="Checkout__section">
                <h1>Check Out</h1>
                {user ? (
                    <div className="Checkout--cart">
                        <Form
                            form={form}
                            name="checkout_data"
                            onFinish={address => {
                                console.log({ address, cart });
                            }}
                            layout="vertical"
                            requiredMark={false}
                            validateTrigger="onBlur"
                            className="Checkout__form"
                            initialValues={user.address}
                        >
                            <div>
                                <h3>Your Cart</h3>
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
                                <p>This is a demo. We don't want your money, and there are no goods to ship. ☺️</p>
                            </div>
                            <div className="Checkout--cart__confirm">
                                <Button type="primary" htmlType="submit">
                                    Order now
                                </Button>
                            </div>
                        </Form>
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
