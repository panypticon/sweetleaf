import { useState, useRef, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingOutlined, UserOutlined, SearchOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useRequest, useDebounce } from 'ahooks';
import capitalize from 'lodash/capitalize';

import Button from '../button/button';
import Menu from './menu';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectappState, setMobileNavState, setSearchTerm } from '../../store/slices/appState';
import { selectGlobalData } from '../../store/slices/globalData';
import AccountPopover from './accountpopover';
import { modalContext } from '../../context/modalcontext';
import { getJSONData } from '../../api/fetch';

import type { InputRef } from 'antd';

import { StyledHeader } from './header.styled';

import leafletLogo from '../../assets/leaflet-icon.svg';

interface SearchResult {
    id: string;
    name: string;
    [x: string]: any;
}

const Header = (): JSX.Element => {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const searchInputRef = useRef<InputRef>(null);

    useEffect(() => {
        const searchInput = searchInputRef.current as HTMLElement | null;
        mobileSearchOpen && searchInput && searchInput.focus();
    }, [mobileSearchOpen]);

    const modalData = useContext(modalContext);

    const { data, runAsync } = useRequest(searchterm => getJSONData(`/api/v1/products/query?name=${searchterm}`), {
        manual: true,
        debounceWait: 300,
        debounceLeading: true
    });

    const { mobileNavOpen, searchTerm, cart } = useAppSelector(selectappState);
    const { user } = useAppSelector(selectGlobalData);
    const dispatch = useAppDispatch();

    const cartSize = useMemo(() => Object.keys(cart).length, [cart]);

    const debouncedSearchTerm = useDebounce(searchTerm, { wait: 500 });

    useEffect(() => {
        debouncedSearchTerm.length >= 2 && runAsync(debouncedSearchTerm);
    }, [debouncedSearchTerm, runAsync]);

    const MenuIcon = mobileNavOpen ? CloseOutlined : MenuOutlined;

    console.log(cart);

    return (
        <StyledHeader
            className={`Header ${modalData?.modal ? 'Header--modalopen' : ''}`}
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
                    <Input
                        type="search"
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        onFocus={() => modalData?.setModal(false)}
                        ref={searchInputRef}
                        bordered={false}
                        allowClear={true}
                        value={searchTerm}
                        onChange={evt => dispatch(setSearchTerm(evt.target.value))}
                    />
                    {searchTerm.length >= 2 && data && data.length > 0 && (
                        <ul className="Header__search-results">
                            {data.map(({ id, name, category, type }: SearchResult) => (
                                <li key={id}>
                                    <Link className="link" to={`/${type}/id/${id}`}>
                                        <span className="link__name">{name}</span>
                                        <span className="link__type">{capitalize(type)}</span>
                                        <span className={`link__category link__category--${category}`}></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="Header__actions">
                    {!mobileNavOpen && (
                        <>
                            <Button className="Header__button-discover">Discover your taste</Button>
                            <SearchOutlined
                                className="Header__actions-search"
                                onClick={evt => {
                                    evt.stopPropagation();
                                    setMobileSearchOpen(!mobileSearchOpen);
                                }}
                            />
                            <div className="Header__login">
                                {user && (
                                    <span className="Header__login-hi">
                                        Hello
                                        <br />
                                        {user.address.firstName}
                                    </span>
                                )}
                                <AccountPopover user={user}>
                                    <UserOutlined />
                                </AccountPopover>
                            </div>
                            <span className="Header__cart">
                                {cartSize > 0 && <span className="Header__cart-size">{cartSize}</span>}
                                <ShoppingOutlined />
                            </span>
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
