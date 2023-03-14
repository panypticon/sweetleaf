import styled from 'styled-components';

import { defaults, colors, breakpoints } from '../../root.styled';

export const StyledCheckout = styled.article`
    h1 {
        margin-bottom: calc(${defaults.layoutPadding} * 2);
    }

    h3 {
        color: ${colors.contrast.dark};
        margin-bottom: ${defaults.layoutPadding};
    }

    .Checkout {
        &__section {
            padding: 0 ${defaults.layoutPadding};
            margin: calc(${defaults.layoutPadding} * 3) 0;
            max-width: 61.80339887%;

            @media (max-width: ${breakpoints.lg}) {
                width: 100%;
                max-width: unset;
            }

            &:first-of-type {
                margin: ${defaults.layoutPadding} 0;
            }
        }

        &__form-row {
            display: flex;
            gap: ${defaults.layoutPadding};

            > * {
                flex: 1;
            }

            @media (max-width: ${breakpoints.xs}) {
                display: block;
            }
        }

        &--login {
            .Button {
                margin: 0 calc(${defaults.layoutPadding} / 2);
            }

            @media (max-width: ${breakpoints.xs}) {
                p {
                    text-align: center;
                }
                .Button {
                    width: 100%;
                    margin: calc(${defaults.layoutPadding} / 2) 0;
                }
            }
        }

        &--cart {
            .ant-form > div:not(:last-child) {
                margin-bottom: calc(${defaults.layoutPadding} * 2);
            }

            &__total {
                display: flex;
                justify-content: flex-end;
                gap: ${defaults.layoutPadding};
                font-weight: 600;
                padding-top: calc(${defaults.layoutPadding} / 2);
                border-top: 0.2rem solid ${colors.contrast['shade-6']};
                margin-top: calc(${defaults.layoutPadding} / 2);
            }

            &__confirm {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: ${defaults.layoutPadding};

                .anticon {
                    margin-right: 0.8rem;
                }

                .error {
                    .anticon {
                        color: ${colors.herbal.standard};
                    }
                }

                @media (max-width: ${breakpoints.sm}) {
                    flex-direction: column-reverse;

                    .Button {
                        align-self: stretch;
                        width: 100%;
                    }
                }
            }
        }

        &--success {
            &__buttons {
                margin-top: ${defaults.layoutPadding};
                display: flex;
                gap: calc(${defaults.layoutPadding} / 2);
                align-items: center;
            }
        }
    }
`;

export default StyledCheckout;
