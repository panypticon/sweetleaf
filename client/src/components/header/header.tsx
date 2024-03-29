import { useRef, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingOutlined, UserOutlined, SearchOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useRequest, useDebounce } from 'ahooks';
import capitalize from 'lodash/capitalize';
import { useLocation } from 'react-router-dom';

import Button from '../button/button';
import Menu from './menu';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectAppState, setMobileNavState, setSearchTerm, setMobileSearchState } from '../../store/slices/appState';
import { selectGlobalData } from '../../store/slices/globalData';
import AccountPopover from './accountpopover';
import CartPopover from './cartpopover';
import { modalContext } from '../../context/modalcontext';
import { getJSONData } from '../../api/fetch';
import DiscoverTasteModal from '../discovertastemodal/discovertastemodal';

import type { InputRef } from 'antd';
import type { PropsWithChildren } from 'react';
import type { ModalContext } from '../../types';

import { StyledHeader } from './header.styled';

import leafletLogo from '../../assets/leaflet-icon.svg';

interface SearchResult {
    id: string;
    name: string;
    [x: string]: any;
}

const Header = (): JSX.Element => {
    const searchInputRef = useRef<InputRef>(null);

    const { mobileNavOpen, mobileSearchOpen, searchTerm, cart } = useAppSelector(selectAppState);
    const { user } = useAppSelector(selectGlobalData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const searchInput = searchInputRef.current as HTMLElement | null;
        mobileSearchOpen && searchInput && searchInput.focus();
    }, [mobileSearchOpen]);

    const { setModal, modal } = useContext(modalContext) as ModalContext;

    const { data, runAsync } = useRequest(searchterm => getJSONData(`/api/v1/products/query?name=${searchterm}`), {
        manual: true,
        debounceWait: 300,
        debounceLeading: true
    });

    const cartSize = useMemo(() => Object.keys(cart).length, [cart]);

    const debouncedSearchTerm = useDebounce(searchTerm, { wait: 500 });

    useEffect(() => {
        debouncedSearchTerm.length >= 2 && runAsync(debouncedSearchTerm);
    }, [debouncedSearchTerm, runAsync]);

    const MenuIcon = mobileNavOpen ? CloseOutlined : MenuOutlined;

    const { pathname } = useLocation();

    const CartPopoverComponent =
        pathname === '/checkout' ? ({ children }: PropsWithChildren) => <span>{children}</span> : CartPopover;

    return (
        <StyledHeader
            className={`Header ${modal ? 'Header--modalopen' : ''}`}
            onClick={() => {
                dispatch(setMobileNavState(false));
                dispatch(setMobileSearchState(false));
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
                        onFocus={() => setModal(false)}
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
                                        {type === 'tea' && (
                                            <span className={`link__category link__category--${category}`}></span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="Header__actions">
                    {!mobileNavOpen && (
                        <>
                            {!user?.preferences && (
                                <Button
                                    className="Header__button-discover"
                                    onClick={() => setModal(<DiscoverTasteModal />)}
                                >
                                    Discover your taste
                                </Button>
                            )}
                            <SearchOutlined
                                className="Header__actions-search"
                                onClick={evt => {
                                    evt.stopPropagation();
                                    dispatch(setMobileSearchState(!mobileSearchOpen));
                                }}
                            />
                            <div className="Header__login">
                                <AccountPopover user={user}>
                                    {user && (
                                        <span className="Header__login-hi">
                                            Hello
                                            <span>{user.address.firstName}</span>
                                        </span>
                                    )}
                                    <UserOutlined />
                                </AccountPopover>
                            </div>
                            <span className="Header__cart">
                                <CartPopoverComponent data={cart}>
                                    <ShoppingOutlined />
                                    {cartSize > 0 && <span className="Header__cart-size">{cartSize}</span>}
                                </CartPopoverComponent>
                            </span>
                        </>
                    )}
                    <MenuIcon
                        className="Header__actions-menu"
                        onClick={evt => {
                            evt.stopPropagation();
                            dispatch(setMobileSearchState(false));
                            dispatch(setMobileNavState(!mobileNavOpen));
                        }}
                    />
                </div>
            </div>
        </StyledHeader>
    );
};

export default Header;
