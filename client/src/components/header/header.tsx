import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingOutlined, UserOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';

import Input from '../input/input';
import Button from '../button/button';
import Menu from './menu';

import { StyledHeader } from './header.styled';

import leafletLogo from '../../assets/leaflet-icon.svg';

const Header = (): JSX.Element => {
    return (
        <StyledHeader className="Header">
            <div className="Header__content">
                <Link to="/" className="Header__logo">
                    <img src={leafletLogo} alt="Leaflet" />
                </Link>
                <nav className="Header__nav">
                    <Menu />
                </nav>
                <div className="Header__search">
                    <Input type="search" placeholder="Search" prefix={<SearchOutlined />} />
                </div>
                <div className="Header__actions">
                    <Button>Discover your taste</Button>
                    <SearchOutlined className="Header__actions-search" />
                    <UserOutlined />
                    <ShoppingOutlined />
                    <MenuOutlined className="Header__actions-menu" />
                </div>
            </div>
        </StyledHeader>
    );
};

export default Header;
