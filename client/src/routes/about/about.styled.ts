import styled from 'styled-components';

import { defaults, breakpoints } from '../../root.styled';

const StyledAbout = styled.article`
    padding: 0 ${defaults.layoutPadding};
    margin: ${defaults.layoutPadding} 0;
    max-width: calc(61.80339887% - (${defaults.layoutPadding} / 2));

    @media (max-width: ${breakpoints.lg}) {
        width: 100%;
        max-width: unset;
    }

    p,
    ul {
        margin-bottom: calc(${defaults.layoutPadding} / 2);
    }

    ul {
        padding-left: ${defaults.layoutPadding};
    }
`;

export default StyledAbout;
