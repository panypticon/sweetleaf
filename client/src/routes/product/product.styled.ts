import styled from 'styled-components';

import { defaults, colors, breakpoints } from '../../root.styled';

export const StyledProduct = styled.article`
    h1 {
        color: ${colors.contrast.dark};
        margin-bottom: calc(${defaults.layoutPadding} * 3);
    }

    h2 {
        color: ${colors.contrast.dark};
        margin-bottom: ${defaults.layoutPadding};
    }

    .Product {
        &__section {
            padding: 0 ${defaults.layoutPadding};
            margin: ${defaults.layoutPadding} 0;

            &:not(:first-of-type) {
                margin: calc(${defaults.layoutPadding} * 3) 0;
            }
        }

        &__main {
            display: flex;
            flex-wrap: wrap;
            gap: ${defaults.layoutPadding};
            align-items: flex-start;

            img {
                mix-blend-mode: multiply;
                width: calc(38.19660113% - (${defaults.layoutPadding} / 2));

                @media (max-width: ${breakpoints.md}) {
                    width: 100%;
                }
            }
        }

        &__data {
            flex: 1;
        }
    }
`;
