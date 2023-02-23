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

                &-results {
                    list-style: none;
                    position: absolute;
                    top: 6rem;
                    left: 0;
                    right: 0;
                    backdrop-filter: blur(5rem);
                    background: ${rgba(colors.contrast.light, 0.8)};
                    width: 66.66666%;
                    max-width: ${defaults.layoutMaxWidth};
                    padding: calc(${defaults.layoutPadding} / 2) 0;
                    margin: 0 auto;
                    box-shadow: 0 0 1.2rem ${rgba(colors.contrast.dark, 0.075)};
                    border: 0.1rem solid ${colors.contrast['shade-6']};
                    border-top: none;

                    @media (max-width: ${breakpoints.md}) {
                        width: 100%;
                    }

                    li {
                        height: 3.6rem;
                        display: flex;
                        align-items: center;

                        &:hover {
                            background-color: ${rgba(colors.fermented.standard, 0.2)};
                        }
                    }

                    .link {
                        &:link,
                        &:visited,
                        &:hover,
                        &:active {
                            color: inherit;
                        }

                        &__type,
                        &__category {
                            color: ${colors.contrast['shade-3']};
                        }

                        &__category {
                            display: inline-block;
                            width: 1.4rem;
                            height: 1.4rem;
                            box-shadow: 0 0 0.4rem ${rgba(colors.contrast.dark, 0.2)};
                            border-radius: 50%;

                            &--green {
                                background-color: ${colors.steamed.standard};
                            }

                            &--white {
                                background-color: ${colors.contrast.light};
                            }
                        }

                        &__type {
                            margin-left: auto;
                        }

                        flex-basis: 100%;
                        padding: 0 ${defaults.layoutPadding};
                        display: flex;
                        align-items: center;
                        gap: calc(${defaults.layoutPadding} / 2);
                    }
                }

                .ant-form {
                    flex: 1;

                    &-item {
                        margin-bottom: 0;
                    }
                }

                .ant-input {
                    caret-color: ${colors.contrast.dark};

                    &-affix-wrapper {
                        padding: 0;

                        .ant-input-prefix .anticon svg {
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
                    padding: 0.8rem;
                    margin-left: -0.8rem;
                    margin-right: -0.8rem;
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
                    .Header__button-discover {
                        display: none;
                    }
                }
            }

            &__login {
                > span {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                }

                &-hi {
                    font-size: 1.2rem;
                    display: flex;
                    flex-direction: column;
                    line-height: 1.1;
                    text-align: right;
                    font-weight: 600;

                    > span {
                        max-width: 8rem;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }

            &__cart {
                position: relative;

                > span {
                    display: flex;
                    gap: 0.4rem;
                    align-items: center;

                    &:hover {
                        svg {
                            color: ${colors.steamed.standard};
                        }
                    }
                }

                &-size {
                    background-color: ${colors.steamed.standard};
                    min-width: 1.8rem;
                    height: 1.8rem;
                    border-radius: 1rem;
                    padding: 0 0.4rem;
                    color: ${colors.contrast.light};
                    font-size: 1rem;
                    display: flex;
                    font-weight: 600;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transform: translateY(0.2rem);
                }
            }
        }

        &.Header--modalopen {
            .ant-popover {
                display: none;
            }

            .Header__content {
                *:not(:first-child) {
                    display: none;
                }
            }
        }

        @media (max-width: ${breakpoints.sm}) {
            .ant-popover {
                max-width: 100% !important;

                &-arrow {
                    display: none;
                }
            }
        }
    }
`;
