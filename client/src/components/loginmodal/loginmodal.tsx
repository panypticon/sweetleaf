import { Form, Input } from 'antd';

import Button from '../button/button';

import StyledLoginModal from './loginmodal.styled';

interface Props {
    [x: string]: any;
}

const LoginModal = (props: Props) => {
    const [form] = Form.useForm();

    const handleFinish = async (values: object) => {
        console.log('finish', values);
        try {
            console.log(JSON.stringify(values));
            const res = await fetch('/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            console.log({ res });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <StyledLoginModal title="My Account" footer={null} {...props}>
            <Form form={form} name="login" onFinish={handleFinish} layout="vertical" requiredMark={false}>
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
