import { Form, Input } from 'antd';
import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';

import { selectGlobalData } from '../../store/slices/globalData';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Button from '../../components/button/button';
import useAuthProtection from '../../hooks/useAuthProtection';
import { postJSONData } from '../../api/fetch';
import { setUser } from '../../store/slices/globalData';
import useTimedRequestState from '../../hooks/useTimedRequestState';
import Select from '../../components/select/select';

import type { User } from '../../types';

import { StyledAccount } from './account.styled';

const countryOptions = [
    { label: 'Austria', value: 'austria' },
    { label: 'Germany', value: 'germany' },
    { label: 'Switzerland', value: 'switzerland' }
];

const Account = (): JSX.Element => {
    const [nameAddressState, setNameAddressState] = useTimedRequestState(2500);
    const [passwordState, setPasswordState] = useTimedRequestState(2500);

    useAuthProtection();

    const { user } = useAppSelector(selectGlobalData);

    const [nameAddressForm] = Form.useForm();
    const [passwordForm] = Form.useForm();

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

    const handlePasswordSubmit = async (vals: { currentPassword: string; newPassword: string }) => {
        try {
            await postJSONData(`/api/v1/users/${user?.id}/password`, vals, 'PUT');
            setPasswordState({ success: true, error: false });
            passwordForm.resetFields();
        } catch (err: any) {
            setPasswordState({ success: false, error: true, status: Number(err.message) });
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
                            form={nameAddressForm}
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
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={nameAddressState.success || nameAddressState.error}
                                >
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
                    <section className="Account__section">
                        <h2>Email</h2>
                        <Form name="email" layout="vertical" requiredMark={false}>
                            <Form.Item name="email" label="Email" initialValue={user.email}>
                                <Input disabled />
                            </Form.Item>
                        </Form>
                    </section>
                    {!user.googleID && (
                        <section className="Account__section Account__section--password">
                            <h2>Password</h2>
                            <Form
                                form={passwordForm}
                                name="password"
                                onFinish={handlePasswordSubmit}
                                layout="vertical"
                                requiredMark={false}
                                validateTrigger="onBlur"
                            >
                                <Form.Item
                                    name="currentPassword"
                                    label="Current password"
                                    rules={[{ required: true, message: 'Password is required' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="newPassword"
                                    label="New password"
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
                                <div className="Account__status">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        disabled={passwordState.success || passwordState.error}
                                    >
                                        Change
                                    </Button>
                                    {passwordState.success ? (
                                        <span className="success">
                                            <CheckOutlined />
                                            New password saved
                                        </span>
                                    ) : passwordState.error ? (
                                        <span className="error">
                                            <ExclamationOutlined />
                                            {passwordState.status === 401
                                                ? 'Current password is incorrect'
                                                : passwordState.status === 409
                                                ? 'New password must differ from old one'
                                                : 'Error changing password, try again later'}
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </Form>
                        </section>
                    )}
                </>
            )}
        </StyledAccount>
    );
};

export default Account;
