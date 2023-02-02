import { useEffect, useState, useContext } from 'react';
import { Form, Input } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';

import Button from '../button/button';
import Tag from '../tag/tag';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/globalData';
import { postJSONData } from '../../api/fetch';
import SignupModal from '../signupmodal/signupmodal';
import { modalContext } from '../../context/modalcontext';

import StyledLoginModal from './loginmodal.styled';

interface Props {
    [x: string]: any;
}

const LoginModal = (props: Props) => {
    const [loginError, setLoginError] = useState<String | null>(null);

    const modalData = useContext(modalContext);

    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { data, error, run } = useRequest((url, payload) => postJSONData(url, payload), { manual: true });

    useEffect(() => {
        if (error) {
            if (error.message === '401') setLoginError('Email and password do not match');
            else setLoginError('Something went wrong, please try again later');
        } else if (data) {
            dispatch(setUser(data));
            navigate('/account');
        }
    }, [data, error, dispatch, navigate]);

    const handleFinish = (values: object) => run('/api/v1/users/login', values);

    return (
        <StyledLoginModal title="Leaflet Account" footer={null} {...props}>
            {loginError && <Tag color="error">{loginError}</Tag>}
            <Form
                form={form}
                name="login"
                onFinish={handleFinish}
                layout="vertical"
                requiredMark={false}
                validateTrigger="onBlur"
                onValuesChange={() => setLoginError(null)}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Email address is required' },
                        { type: 'email', message: 'Not a valid email adddress' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Password is required' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit" wide>
                    Log in
                </Button>
            </Form>
            <p className="Modal__switch">
                Not registered? <span onClick={() => modalData?.setModal(<SignupModal />)}>Sign up</span>
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
                <span>Log in with Google</span>
            </Button>
        </StyledLoginModal>
    );
};

export default LoginModal;
