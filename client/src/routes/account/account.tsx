import { Form, Input, Select } from 'antd';

import { selectGlobalData } from '../../store/slices/globalData';
import { useAppSelector } from '../../store/hooks';
import Button from '../../components/button/button';
import useAuthProtection from '../../hooks/useAuthProtection';

import { StyledAccount } from './account.styled';

const countryOptions = [
    { label: 'Austria', value: 'austria' },
    { label: 'Germany', value: 'germany' },
    { label: 'Switzerland', value: 'switzerland' }
];

const Account = (): JSX.Element => {
    const { user } = useAppSelector(selectGlobalData);

    useAuthProtection(user);

    const [form] = Form.useForm();

    return (
        <StyledAccount className="Account">
            {user && (
                <>
                    <h1>Account Data</h1>
                    <h2>Name and Address</h2>
                    <Form
                        form={form}
                        name="name_address"
                        onFinish={vals => console.log(vals)}
                        layout="vertical"
                        requiredMark={false}
                        validateTrigger="onBlur"
                    >
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                { required: true, message: 'First name is required' },
                                { max: 128, message: 'First name is too long' }
                            ]}
                            initialValue={user.address.firstName}
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
                            initialValue={user.address.lastName}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="street"
                            label="Street address"
                            rules={[
                                { required: true, message: 'Street address is required' },
                                { max: 266, message: 'Street address is too long' }
                            ]}
                            initialValue={user.address.street}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="city"
                            label="City"
                            rules={[
                                { required: true, message: 'City is required' },
                                { max: 128, message: 'City is too long' }
                            ]}
                            initialValue={user.address.city}
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
                            initialValue={user.address.zip}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="country" label="Country" initialValue={user.address.country}>
                            <Select options={countryOptions} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form>
                    <h2>Email</h2>
                    <h2>Password</h2>
                </>
            )}
        </StyledAccount>
    );
};

export default Account;
