import styled from 'styled-components';

import { defaults, breakpoints } from '../../root.styled';

const StyledProductGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${defaults.layoutPadding};

    @media (max-width: ${breakpoints.xl}) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: ${breakpoints.md}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${breakpoints.xs}) {
        grid-template-columns: 1fr;
    }
`;

export default StyledProductGrid;
