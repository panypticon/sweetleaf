import { useContext, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';

import Button from '../button/button';
import Tag from '../tag/tag';
import { useAppDispatch } from '../../store/hooks';
import { postJSONData } from '../../api/fetch';
import LoginModal from '../loginmodal/loginmodal';
import { modalContext } from '../../context/modalcontext';
import StyledSignupModal from './signupmodal.styled';

import type { ModalProps } from 'antd';
import type { ModalContext } from '../../types';

const SignupModal = (props: ModalProps) => {
    const [signupError, setSignupError] = useState<String | null>(null);

    const { setModal } = useContext(modalContext) as ModalContext;

    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const { data, error, run }: { data?: object; error?: any; run?: any } = useRequest(
        (url, payload) => postJSONData(url, payload),
        { manual: true }
    );

    useEffect(() => {
        error && !error?.details && setSignupError('Something went wrong, please try again later');
    }, [error, dispatch]);

    const handleFinish = ({ firstName, lastName, email, password }: { [x: string]: String }) => {
        const values = {
            address: { firstName, lastName },
            email,
            password
        };
        run('/api/v1/users/signup', values);
    };

    return (
        <StyledSignupModal
            className="SignupModal"
            title={!data ? 'Welcome to Leaflet' : "You're in... almost!"}
            footer={null}
            {...props}
        >
            {!data ? (
                <>
                    {signupError && <Tag color="error">{signupError}</Tag>}
                    <Form
                        form={form}
                        name="signup"
                        onFinish={handleFinish}
                        layout="vertical"
                        requiredMark={false}
                        validateTrigger="onBlur"
                        onValuesChange={() => setSignupError(null)}
                    >
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
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Email address is required' },
                                { type: 'email', message: 'Not a valid email adddress' }
                            ]}
                            validateStatus={
                                error?.details?.detail && error.details.detail.includes('email') ? 'error' : undefined
                            }
                            help={
                                error?.details?.detail && error.details.detail.includes('email')
                                    ? error.details.detail[1]
                                    : null
                            }
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            extra="Password must be 8+ characters long and must include upper- and lower-case letters, numbers, and special characters"
                            rules={[
                                { required: true, message: 'Password is required' },
                                {
                                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                                    message: "Password doesn't match security rules"
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" wide>
                            Sign up
                        </Button>
                    </Form>
                    <p className="Modal__switch">
                        Already registered? <span onClick={() => setModal(<LoginModal />)}>Log in</span>
                    </p>
                    <span className="Modal__separator">
                        <div>
                            <span>or</span>
                        </div>
                        <hr />
                    </span>
                    <Button
                        wide
                        onClick={() => {
                            window.location.href = `${process.env.REACT_APP_SERVER || ''}/api/v1/users/login/google`;
                        }}
                    >
                        <GoogleOutlined />
                        <span>Sign up with Google</span>
                    </Button>
                </>
            ) : (
                <div className="SignupModal--success">
                    <p>
                        <strong>Please check your inbox to verify your email address.</strong>
                    </p>
                    <p>Only then will you be able to log in.</p>
                    <p>
                        Already verified? <Button onClick={() => setModal(<LoginModal />)}>Log in</Button>
                    </p>
                </div>
            )}
        </StyledSignupModal>
    );
};

export default SignupModal;
