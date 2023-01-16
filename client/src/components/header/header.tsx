import { Link } from 'react-router-dom';
import { ShoppingOutlined, UserOutlined, SearchOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

import Input from '../input/input';
import Button from '../button/button';
import Menu from './menu';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectappState } from '../../store/slices/appState';
import { toggleMobileNav } from '../../store/slices/appState';

import { StyledHeader } from './header.styled';

import leafletLogo from '../../assets/leaflet-icon.svg';

const Header = (): JSX.Element => {
    const { mobileNavOpen } = useAppSelector(selectappState);
    const dispatch = useAppDispatch();

    const MenuIcon = mobileNavOpen ? CloseOutlined : MenuOutlined;

    return (
        <StyledHeader className="Header">
            <div className="Header__content">
                <Link to="/" className="Header__logo">
                    <img src={leafletLogo} alt="Leaflet" />
                </Link>
                <nav className={`Header__nav ${mobileNavOpen ? 'Header__nav--mobile-open' : ''}`}>
                    <Menu />
                </nav>
                <div className="Header__search">
                    <Input type="search" placeholder="Search" prefix={<SearchOutlined />} />
                </div>
                <div className="Header__actions">
                    {!mobileNavOpen && (
                        <>
                            <Button>Discover your taste</Button>
                            <SearchOutlined className="Header__actions-search" />
                            <UserOutlined />
                            <ShoppingOutlined />
                        </>
                    )}
                    <MenuIcon className="Header__actions-menu" onClick={() => dispatch(toggleMobileNav())} />
                </div>
            </div>
        </StyledHeader>
    );
};

export default Header;
