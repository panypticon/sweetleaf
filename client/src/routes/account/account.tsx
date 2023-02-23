import { Form, Input, Select } from 'antd';
import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';

import { selectGlobalData } from '../../store/slices/globalData';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Button from '../../components/button/button';
import useAuthProtection from '../../hooks/useAuthProtection';
import { postJSONData } from '../../api/fetch';
import { setUser } from '../../store/slices/globalData';
import useTimedRequestState from '../../hooks/useTimedRequestState';

import type { User } from '../../types';

import { StyledAccount } from './account.styled';

const countryOptions = [
    { label: 'Austria', value: 'austria' },
    { label: 'Germany', value: 'germany' },
    { label: 'Switzerland', value: 'switzerland' }
];

const Account = (): JSX.Element => {
    const [nameAddressState, setNameAddressState] = useTimedRequestState(2000);

    const { user } = useAppSelector(selectGlobalData);
    useAuthProtection(user);

    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const handleNameAddressSubmit = async (vals: User) => {
        try {
            const newUser = await postJSONData(`/api/v1/users/${user?.id}`, { address: vals }, 'PUT');
            newUser && dispatch(setUser(newUser));
            setNameAddressState({ success: true, error: false });
        } catch (err) {
            setNameAddressState({ success: false, error: true });
        }
    };

    return (
        <StyledAccount className="Account">
            {user && (
                <>
                    <h1>Account Data</h1>
                    <section className="Account__section">
                        <h2>Name and Address</h2>
                        <Form
                            form={form}
                            name="name_address"
                            onFinish={handleNameAddressSubmit}
                            layout="vertical"
                            requiredMark={false}
                            validateTrigger="onBlur"
                        >
                            <span className="Account__form-column">
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
                            </span>
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
                            <span className="Account__form-column">
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
                            </span>
                            <Form.Item name="country" label="Country" initialValue={user.address.country}>
                                <Select options={countryOptions} />
                            </Form.Item>
                            <div className="Account__status">
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                                {nameAddressState.success ? (
                                    <span className="success">
                                        <CheckOutlined />
                                        Changes saved
                                    </span>
                                ) : nameAddressState.error ? (
                                    <span className="error">
                                        <ExclamationOutlined />
                                        Error saving changes, try again later
                                    </span>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Form>
                    </section>
                    <h2>Email</h2>
                    <h2>Password</h2>
                </>
            )}
        </StyledAccount>
    );
};

export default Account;
