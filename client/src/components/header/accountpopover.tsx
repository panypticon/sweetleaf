import { selectGlobalData } from '../../store/slices/globalData';
import { useAppSelector } from '../../store/hooks';

import StyledAccountPopover from './accountpopover.styled';

interface Props {
    [x: string]: any;
}

const AccountPopoverLogin = (): JSX.Element => <>Login</>;

const AccountPopoverActions = (): JSX.Element => <>Actions</>;

const AccountPopover = (props: Props): JSX.Element => {
    const { user } = useAppSelector(selectGlobalData);

    return (
        <StyledAccountPopover
            overlayClassName="AccountPopover"
            title={<h5>My Account</h5>}
            placement="bottomRight"
            content={user ? <AccountPopoverActions /> : <AccountPopoverLogin />}
            getPopupContainer={() => document.querySelector('.Header .Header__actions')}
            align={{ offset: [12, 6] }}
            {...props}
        />
    );
};

export default AccountPopover;
