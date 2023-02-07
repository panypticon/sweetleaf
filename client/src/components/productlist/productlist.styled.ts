import { defaults } from '../../root.styled';

import styled from 'styled-components';

const StyledProductList = styled.section<{ length: number }>`
    width: calc(100% + 2 * ${defaults.layoutPadding});
    margin-left: calc(${defaults.layoutPadding} * -1);
    overflow-x: scroll;

    .ProductList {
        &__data {
            width: calc(${props => Math.ceil(props.length / 4) * 100}% - ${props => (props.length <= 4 ? 0 : 20)}%);
            display: grid;
            padding: ${defaults.layoutPadding};
            gap: ${defaults.layoutPadding};
            grid-template-columns: repeat(
                max(${props => props.length + (props.length % 4 ? 4 - (props.length % 4) : 0)}, 4),
                1fr
            );
        }
    }
`;

export default StyledProductList;
