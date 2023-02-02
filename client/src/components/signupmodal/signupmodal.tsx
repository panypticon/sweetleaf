import { useContext, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';

import Button from '../button/button';
import Tag from '../tag/tag';
import { useAppDispatch } from '../../store/hooks';
import { postJSONData } from '../../api/fetch';
import LoginModal from '../loginmodal/loginmodal';
import { modalContext } from '../../context/modalcontext';
import Modal from '../modal/modal';

interface Props {
    [x: string]: any;
}

const SignupModal = (props: Props) => {
    const [signupError, setSignupError] = useState<String | null>(null);

    const modalData = useContext(modalContext);

    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { data, error, run }: { data?: object; error?: any; run?: any } = useRequest(
        (url, payload) => postJSONData(url, payload),
        { manual: true }
    );

    useEffect(() => {
        if (error && !error?.details?.detail && !error.details.detail.includes('email')) {
            setSignupError('Something went wrong, please try again later');
        } else if (data) {
            console.log(data);
            // Open modal success, notice email confirmation, set fields in non-Google user vor valdidated and validationToken
            // Login middleware check if validated or Google ID
            // redirect to root
        }
    }, [data, error, dispatch, navigate]);

    const handleFinish = ({ firstName, lastName, email, password }: { [x: string]: String }) => {
        const values = {
            address: { firstName, lastName },
            email,
            password
        };
        run('/api/v1/users/signup', values);
    };

    return (
        <Modal className="SignupModal" title="Welcome to Leaflet" footer={null} {...props}>
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
                Already registered? <span onClick={() => modalData?.setModal(<LoginModal />)}>Log in</span>
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
        </Modal>
    );
};

export default SignupModal;
