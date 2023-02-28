import { colors, defaults } from '../../root.styled';

import styled from 'styled-components';

const StyledCartItem = styled.li`
    &.CartItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: ${defaults.layoutPadding};

        > span {
            flex: 1;
        }

        &:not(:last-of-type) {
            border-bottom: 0.1rem solid ${colors.contrast['shade-6']};
            padding-bottom: calc(${defaults.layoutPadding} / 2);
        }

        img {
            width: 6.8rem;
            mix-blend-mode: multiply;
        }

        h6 {
            color: ${colors.fermented.standard};
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 0.4rem;
        }
    }

    .CartItem {
        &__specs {
            display: flex;
            gap: calc(${defaults.layoutPadding} / 2);
            align-items: center;
            justify-content: space-between;
        }

        &__amount {
            display: flex;
            gap: 0.4rem;
            align-items: center;

            span.anticon {
                &.anticon-plus-circle,
                &.anticon-minus-circle {
                    svg {
                        width: 1.6rem;
                        height: 1.6rem;
                        color: ${colors.oolong.standard};

                        &:hover {
                            color: ${colors.oolong['lighter-1']};
                        }
                    }
                }
            }

            > span {
                min-width: 2rem;
                text-align: center;
            }
        }

        &__price {
            font-weight: 600;
        }
    }
`;

export default StyledCartItem;
