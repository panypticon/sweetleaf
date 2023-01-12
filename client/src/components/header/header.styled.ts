import { Layout } from 'antd';
import styled from 'styled-components';
import { rgba } from 'polished';
import { NavLink } from 'react-router-dom';

import { colors, defaults } from '../../root.styled';

export const StyledHeader = styled(Layout.Header)`
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
                align-self: stretch;
                border-left: 0.1rem solid ${colors.contrast['shade-6']};
                display: flex;
                align-items: center;
                padding-left: 2.4rem;

                .ant-input {
                    &-affix-wrapper {
                        border: unset;
                        box-shadow: unset;
                        padding: 0;

                        .anticon svg {
                            color: ${colors.contrast.dark};
                            width: 2.4rem;
                            height: 2.4rem;
                        }
                    }

                    &-prefix {
                        margin-right: 1.2rem;
                    }
                }
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

export const StyledNavLink = styled(NavLink)`
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
