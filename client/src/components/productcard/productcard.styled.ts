import { rgba } from 'polished';

import { colors, defaults } from '../../root.styled';

import styled from 'styled-components';

const StyledProductCard = styled.li`
    list-style: none;
    background-color: ${colors.contrast.light};
    box-shadow: 0 0 1.2rem ${rgba(colors.contrast.dark, 0.1)};

    img {
        width: 100%;
        mix-blend-mode: multiply;
    }

    .ProductCard {
        &__header {
            padding: ${defaults.layoutPadding};

            h4 {
                color: ${colors.contrast.dark};
            }
        }
    }
`;

export default StyledProductCard;
