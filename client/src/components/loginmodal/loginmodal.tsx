import { useState } from 'react';
import { Form, Input } from 'antd';

import Button from '../button/button';
import Tag from '../tag/tag';

import StyledLoginModal from './loginmodal.styled';

interface Props {
    [x: string]: any;
}

const LoginModal = (props: Props) => {
    const [form] = Form.useForm();

    const [loginError, setLoginError] = useState<String | null>(null);

    const handleFinish = async (values: object) => {
        try {
            console.log(JSON.stringify(values));
            const res = await fetch('/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (!res.ok) {
                const error = new Error(String(res.status));
                throw error;
            }
            const data = await res.json();
            console.log(data);
        } catch (err: any) {
            if (err.message === '401') setLoginError('Email and password do not match');
            else setLoginError('Something went wrong, please try again later');
        }
    };

    return (
        <StyledLoginModal title="My Account" footer={null} {...props}>
            {loginError && <Tag color="error">{loginError}</Tag>}
            <Form
                form={form}
                name="login"
                onFinish={handleFinish}
                layout="vertical"
                requiredMark={false}
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
        </StyledLoginModal>
    );
};

export default LoginModal;
