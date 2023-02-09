import { defaults, breakpoints } from '../../root.styled';

import styled from 'styled-components';

const StyledProductList = styled.section<{ length: number }>`
    width: calc(100% + 2 * ${defaults.layoutPadding});
    margin-left: calc(${defaults.layoutPadding} * -1);
    overflow-x: scroll;

    .ProductList {
        &__data {
            width: calc(${props => Math.ceil(props.length / 4) * 50}% - ${props => (props.length <= 4 ? 0 : 10)}%);
            display: grid;
            padding: ${defaults.layoutPadding};
            gap: ${defaults.layoutPadding};
            grid-template-rows: 1fr 1fr;
            grid-auto-flow: column;
            grid-template-columns: repeat(max(${props => props.length / 2}, 4), 1fr);

            @media (max-width: 72em) {
                width: calc(${props => Math.ceil(props.length / 3) * 50}% - ${props => (props.length <= 3 ? 0 : 20)}%);
            }

            @media (max-width: ${breakpoints.md}) {
                width: calc(${props => Math.ceil(props.length / 2) * 50}% - ${props => (props.length <= 2 ? 0 : 40)}%);
            }

            @media (max-width: ${breakpoints.xs}) {
                width: calc(${props => Math.ceil(props.length / 1) * 50}% - ${props => (props.length <= 1 ? 0 : 80)}%);
            }
        }
    }
`;

export default StyledProductList;
