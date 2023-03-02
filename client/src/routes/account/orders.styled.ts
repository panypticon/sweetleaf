import { defaults, colors } from '../../root.styled';

import styled from 'styled-components';

export const StyledOrders = styled.article`
    padding: 0 ${defaults.layoutPadding};
    margin: ${defaults.layoutPadding} 0;

    h1 {
        margin-bottom: calc(${defaults.layoutPadding} * 2);
    }

    .Orders {
        &__list {
            list-style: none;
        }
    }

    .OrderItem {
        border: 0.1rem solid ${colors.contrast['shade-6']};
        height: 3.7rem;
        padding: 0 ${defaults.layoutPadding};
        display: flex;
        gap: ${defaults.layoutPadding};
        align-items: center;
        cursor: pointer;

        &:not(:first-child) {
            margin-top: -0.1rem;
        }

        &:first-child {
            border-top-left-radius: ${defaults.radiusDefault};
            border-top-right-radius: ${defaults.radiusDefault};
        }

        &:last-child {
            border-bottom-left-radius: ${defaults.radiusDefault};
            border-bottom-right-radius: ${defaults.radiusDefault};
        }

        span:last-of-type {
            margin-left: auto;
        }

        .Button {
            display: none;
            margin-left: auto;
            border-radius: 0;
        }

        @media (hover: hover) {
            &:hover {
                .Button {
                    display: block;
                }

                span:last-of-type {
                    margin-left: unset;
                }
            }
        }

        &__description {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        > span {
            white-space: nowrap;
        }
    }
`;
