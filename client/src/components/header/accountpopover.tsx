import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import { selectGlobalData } from '../../store/slices/globalData';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Button from '../button/button';
import { modalContext } from '../../context/modalcontext';
import LoginModal from '../loginmodal/loginmodal';
import { removeUser } from '../../store/slices/globalData';

import StyledAccountPopover from './accountpopover.styled';

interface Props {
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
                <Button wide>Sign up </Button>
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
                <Link to="/account">My account</Link>
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
                            messageAPI.error('Something went wrong, please try again later', 0);
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
    const { user } = useAppSelector(selectGlobalData);

    const { sm } = useResponsive();

    return (
        <StyledAccountPopover
            overlayClassName="AccountPopover"
            title={<h5>{user ? `Hi ${user.address?.firstName}!` : 'My Account'}</h5>}
            placement={sm ? 'bottomRight' : 'bottom'}
            content={user ? <AccountPopoverActions /> : <AccountPopoverLogin />}
            getPopupContainer={() => document.querySelector('.Header .Header__actions')}
            align={{ offset: [4, -2] }}
            {...props}
        />
    );
};

export default AccountPopover;
