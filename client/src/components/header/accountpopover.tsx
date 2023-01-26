import { Link } from 'react-router-dom';

import { selectGlobalData } from '../../store/slices/globalData';
import { useAppSelector } from '../../store/hooks';
import Button from '../button/button';

import StyledAccountPopover from './accountpopover.styled';

interface Props {
    [x: string]: any;
}

const AccountPopoverLogin = (): JSX.Element => (
    <>
        <Button type="primary" wide>
            Log in
        </Button>
        <div className="AccountPopover__signup">
            <p>New around here?</p>
            <Button wide>Sign up </Button>
        </div>
    </>
);

const AccountPopoverActions = (): JSX.Element => (
    <ul className="AccountPopover__items">
        <li>
            <Link to="/account">Account data</Link>
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
    </ul>
);

const AccountPopover = (props: Props): JSX.Element => {
    const { user } = useAppSelector(selectGlobalData);

    return (
        <StyledAccountPopover
            overlayClassName="AccountPopover"
            title={<h5>My Account</h5>}
            placement="bottomRight"
            content={user ? <AccountPopoverActions /> : <AccountPopoverLogin />}
            getPopupContainer={() => document.querySelector('.Header .Header__actions')}
            align={{ offset: [4, -2] }}
            {...props}
        />
    );
};

export default AccountPopover;
