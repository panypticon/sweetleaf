import styled from 'styled-components';

import { defaults, colors } from '../../root.styled';

export const StyledProduct = styled.article`
    h1 {
        color: ${colors.contrast.dark};
        margin-bottom: calc(${defaults.layoutPadding} * 2);
    }

    .Product {
        &__section {
            padding: 0 ${defaults.layoutPadding};
            margin: ${defaults.layoutPadding} 0;
        }

        &__main {
            display: flex;
            gap: ${defaults.layoutPadding};

            img {
                mix-blend-mode: multiply;
                width: calc(38.19660113% - (${defaults.layoutPadding} / 2));
            }
        }

        &__data {
            flex: 1;
        }
    }
`;
