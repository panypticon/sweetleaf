import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useResponsive } from 'ahooks';

import { selectGlobalData } from '../../store/slices/globalData';
import { useAppSelector } from '../../store/hooks';
import Button from '../button/button';
import { modalContext } from '../../context/modalcontext';
import LoginModal from '../loginmodal/loginmodal';

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

const AccountPopoverActions = (): JSX.Element => (
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
            <Link to="/">Log out</Link>
        </li>
    </ul>
);

const AccountPopover = (props: Props): JSX.Element => {
    const { user } = useAppSelector(selectGlobalData);

    const { sm } = useResponsive();

    return (
        <StyledAccountPopover
            overlayClassName="AccountPopover"
            title={<h5>{user ? `Hi ${user.address.firstName}!` : 'My Account'}</h5>}
            placement={sm ? 'bottomRight' : 'bottom'}
            content={user ? <AccountPopoverActions /> : <AccountPopoverLogin />}
            getPopupContainer={() => document.querySelector('.Header .Header__actions')}
            align={{ offset: [4, -2] }}
            {...props}
        />
    );
};

export default AccountPopover;
