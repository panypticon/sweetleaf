import { Layout } from 'antd';
import styled from 'styled-components';
import { rgba } from 'polished';

import { colors, defaults, breakpoints } from '../../root.styled';

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

                @media (max-width: ${breakpoints.md}) {
                    display: none;
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

                @media (max-width: ${breakpoints.md}) {
                    display: none;
                }
            }

            &__actions {
                display: flex;
                gap: 2.4rem;
                margin-left: auto;
                align-self: stretch;
                align-items: center;

                .anticon svg {
                    color: ${colors.contrast.dark};
                    width: 2.4rem;
                    height: 2.4rem;

                    &:hover {
                        color: ${colors.steamed.standard};
                    }
                }

                &-search,
                &-menu {
                    display: none;
                }

                @media (max-width: ${breakpoints.md}) {
                    padding-left: ${defaults.layoutPadding};

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
