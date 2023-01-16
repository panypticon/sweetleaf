import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingOutlined, UserOutlined, SearchOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';

import Input from '../input/input';
import Button from '../button/button';
import Menu from './menu';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectappState } from '../../store/slices/appState';
import { setMobileNavState } from '../../store/slices/appState';

import { StyledHeader } from './header.styled';

import leafletLogo from '../../assets/leaflet-icon.svg';

const Header = (): JSX.Element => {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const searchInputRef = useRef<InputRef>(null);

    useEffect(() => {
        const searchInput = searchInputRef.current as HTMLElement | null;
        mobileSearchOpen && searchInput && searchInput.focus();
    }, [mobileSearchOpen]);

    const { mobileNavOpen } = useAppSelector(selectappState);
    const dispatch = useAppDispatch();

    const MenuIcon = mobileNavOpen ? CloseOutlined : MenuOutlined;

    return (
        <StyledHeader
            className="Header"
            onClick={() => {
                dispatch(setMobileNavState(false));
                setMobileSearchOpen(false);
            }}
        >
            <div className="Header__content">
                <Link to="/" className="Header__logo">
                    <img src={leafletLogo} alt="Leaflet" />
                </Link>
                <nav className={`Header__nav ${mobileNavOpen ? 'Header__nav--mobile-open' : ''}`}>
                    <Menu />
                </nav>
                <div
                    className={`Header__search ${mobileSearchOpen ? 'Header__search--mobile-open' : ''}`}
                    onClick={evt => evt.stopPropagation()}
                >
                    <Input type="search" placeholder="Search" prefix={<SearchOutlined />} ref={searchInputRef} />
                </div>
                <div className="Header__actions">
                    {!mobileNavOpen && (
                        <>
                            <Button>Discover your taste</Button>
                            <SearchOutlined
                                className="Header__actions-search"
                                onClick={evt => {
                                    evt.stopPropagation();
                                    setMobileSearchOpen(!mobileSearchOpen);
                                }}
                            />
                            <UserOutlined />
                            <ShoppingOutlined />
                        </>
                    )}
                    <MenuIcon
                        className="Header__actions-menu"
                        onClick={evt => {
                            evt.stopPropagation();
                            setMobileSearchOpen(false);
                            dispatch(setMobileNavState(!mobileNavOpen));
                        }}
                    />
                </div>
            </div>
        </StyledHeader>
    );
};

export default Header;
