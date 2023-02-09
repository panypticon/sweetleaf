import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { useAppDispatch } from '../../store/hooks';
import Button from '../button/button';
import { modalContext } from '../../context/modalcontext';
import LoginModal from '../loginmodal/loginmodal';
import { removeUser } from '../../store/slices/globalData';
import SignupModal from '../signupmodal/signupmodal';

import type { User } from '../../types';

import StyledAccountPopover from './accountpopover.styled';

interface Props {
    user: User | null;
    [x: string]: any;
}

const AccountPopoverLogin = (): JSX.Element => {
    const modalData = useContext(modalContext);

    return (
        <>
            <Button type="primary" wide onClick={() => modalData?.setModal(<LoginModal />)}>
                Log in
            </Button>
            <div className="AccountPopover__signup">
                <p>New around here?</p>
                <Button wide onClick={() => modalData?.setModal(<SignupModal />)}>
                    Sign up
                </Button>
            </div>
        </>
    );
};

const AccountPopoverActions = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageAPI, contextHolder] = message.useMessage();

    return (
        <ul className="AccountPopover__items">
            <li>
                <Link to="/account">Account</Link>
            </li>
            <li>
                <Link to="/account/orders">Orders</Link>
            </li>
            <li>
                <Link to="/account/favorites">Favorites</Link>
            </li>
            <li>
                <Link to="/account/recommendations">Recommendations</Link>
            </li>
            <li>
                <Link to="/account/subscription">MyBox</Link>
            </li>
            <li>
                {contextHolder}
                <span
                    onClick={async () => {
                        try {
                            const res = await fetch('/api/v1/users/logout');
                            if (!res.ok) throw new Error();
                            dispatch(removeUser());
                            navigate('/');
                        } catch (err) {
                            messageAPI.error('Something went wrong, please try again later');
                        }
                    }}
                >
                    Log out
                </span>
            </li>
        </ul>
    );
};

const AccountPopover = (props: Props): JSX.Element => {
    const { sm } = useResponsive();

    return (
        <StyledAccountPopover
            overlayClassName="AccountPopover"
            title={<h5>{props.user ? `${props.user.address?.firstName}'s Leaflet` : 'My Account'}</h5>}
            placement={sm ? 'bottomRight' : 'bottom'}
            content={props.user ? <AccountPopoverActions /> : <AccountPopoverLogin />}
            getPopupContainer={() => document.querySelector('.Header .Header__actions')}
            align={{ offset: [0, 4] }}
            {...props}
        />
    );
};

export default AccountPopover;
