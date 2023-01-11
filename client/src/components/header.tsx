import { Layout } from 'antd';
import { ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Link, NavLink } from 'react-router-dom';

import { colors, defaults } from '../root.styled';

import leafletLogo from '../assets/leaflet-icon.svg';

const StyledHeader = styled(Layout.Header)`
    && {
        backdrop-filter: blur(5rem);
        background: ${rgba(colors.contrast.light, 0.8)};
        height: 6rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 0;
        line-height: unset;
        border-bottom: 0.1rem solid ${colors.contrast['shade-6']};

        .Header {
            &__logo {
                display: flex;
            }

            &__content {
                max-width: ${defaults.layoutMaxWidth};
                padding: 0 ${defaults.layoutPadding};
                height: 100%;
                display: flex;
                align-items: center;
                gap: 4.8rem;
                margin: 0 auto;
            }

            &__nav {
                ul {
                    display: flex;
                    gap: 2.4rem;
                }

                li {
                    list-style: none;
                }
            }

            &__search {
                flex: 1;
            }

            &__actions {
                display: flex;
                gap: 2.4rem;

                .anticon svg {
                    color: ${colors.contrast.dark};
                    width: 2.4rem;
                    height: 2.4rem;

                    &:hover {
                        color: ${colors.steamed.standard};
                    }
                }
            }
        }
    }
`;

const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited,
    &:hover,
    &:active {
        text-decoration: none;
        color: ${colors.contrast.dark};
        font-weight: 600;
    }

    &:hover {
        border-bottom: 0.2rem solid ${colors.steamed.standard};
        padding-bottom: 0.2rem;
    }

    &.active {
        color: ${colors.steamed.standard};
    }
`;

const Header = (): JSX.Element => (
    <StyledHeader className="Header">
        <div className="Header__content">
            <Link to="/" className="Header__logo">
                <img src={leafletLogo} alt="Leaflet" />
            </Link>
            <nav className="Header__nav">
                <ul>
                    <li>
                        <StyledNavLink to="/tea">Tea</StyledNavLink>
                    </li>
                    <li>
                        <StyledNavLink to="/gear">Gear</StyledNavLink>
                    </li>
                    <li>
                        <StyledNavLink to="/mybox">MyBox</StyledNavLink>
                    </li>
                    <li>
                        <StyledNavLink to="/about">About</StyledNavLink>
                    </li>
                </ul>
            </nav>
            <div className="Header__search">Search</div>
            <div className="Header__actions">
                <UserOutlined />
                <ShoppingOutlined />
            </div>
        </div>
    </StyledHeader>
);

export default Header;
