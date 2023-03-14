import styled from 'styled-components';

import { defaults } from '../../root.styled';

const StyledProducts = styled.article`
    .Products {
        &__section {
            padding: 0 ${defaults.layoutPadding};
            margin: calc(${defaults.layoutPadding} * 3) 0;

            &:first-of-type {
                margin: ${defaults.layoutPadding} 0;
            }
        }
    }
`;

export default StyledProducts;
