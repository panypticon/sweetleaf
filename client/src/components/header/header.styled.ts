import { Layout } from 'antd';
import styled from 'styled-components';
import { rgba } from 'polished';

import { colors, defaults, breakpoints } from '../../root.styled';

export const StyledHeader = styled(Layout.Header)`
    && {
        position: fixed;
        height: 6rem;
        backdrop-filter: blur(5rem);
        top: 0;
        left: 0;
        right: 0;
        padding: 0;
        line-height: unset;
        background: ${rgba(colors.contrast.light, 0.8)};
        border-bottom: 0.1rem solid ${colors.contrast['shade-6']};
        box-shadow: 0 0 1.2rem ${rgba(colors.contrast.dark, 0.075)};
        z-index: 100;

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

                @media (max-width: ${breakpoints.md}) {
                    gap: 2.4rem;
                }
            }

            &__nav {
                ul {
                    display: flex;
                    gap: 2.4rem;
                }

                li {
                    list-style: none;
                }

                @media (max-width: ${breakpoints.md}) {
                    position: absolute;
                    top: 6rem;
                    left: 0;
                    right: 0;
                    height: calc(100vh - 6rem);
                    background-color: ${colors.steamed['lighter-4']};
                    display: none;

                    &--mobile-open {
                        display: unset;
                        align-items: center;
                    }

                    ul.Menu {
                        flex-direction: column;
                        margin: 0;
                        padding: 4.8rem 2.4rem;
                        text-align: center;
                        font-size: 1.25em;
                        gap: 4.8rem;
                    }

                    div.MenuBlade {
                        display: none;
                    }
                }
            }

            &__search {
                flex: 1;
                align-self: stretch;
                border-left: 0.1rem solid ${colors.contrast['shade-6']};
                display: flex;
                align-items: center;
                padding-left: ${defaults.layoutPadding};

                .ant-input {
                    background-color: transparent;

                    &-affix-wrapper {
                        border: unset;
                        box-shadow: unset;
                        padding: 0;
                        background-color: transparent;

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

                @media (max-width: ${breakpoints.md}) {
                    position: absolute;
                    top: 6rem;
                    left: 0;
                    right: 0;
                    border-left-width: 0;
                    background: ${rgba(colors.contrast.light, 0.8)};
                    border-bottom: 0.1rem solid ${colors.contrast['shade-6']};
                    backdrop-filter: blur(5rem);
                    height: 6rem;
                    display: none;

                    &--mobile-open {
                        display: flex;
                    }

                    .anticon svg {
                        display: none;
                    }
                }
            }

            &__actions {
                display: flex;
                gap: 2.4rem;
                margin-left: auto;
                align-self: stretch;
                align-items: center;

                .anticon {
                    cursor: pointer;

                    svg {
                        color: ${colors.contrast.dark};
                        width: 2.4rem;
                        height: 2.4rem;

                        &:hover {
                            color: ${colors.steamed.standard};
                        }
                    }
                }

                &-search,
                &-menu {
                    display: none;
                }

                @media (max-width: ${breakpoints.md}) {
                    &-search,
                    &-menu {
                        display: inline-flex;
                    }

                    &-menu {
                        margin-left: ${defaults.layoutPadding};
                    }
                }

                @media (max-width: ${breakpoints.lg}) {
                    .Button {
                        display: none;
                    }
                }
            }
        }
    }
`;
