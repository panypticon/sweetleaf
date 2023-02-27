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
            margin: ${defaults.layoutPadding} 0;

            &:not(:first-of-type) {
                margin: calc(${defaults.layoutPadding} * 3) 0;
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
    }
`;

export default StyledCheckout;
