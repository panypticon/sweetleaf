import { Spin } from 'antd';
import styled from 'styled-components';

import { colors } from '../../root.styled';

const StyledSpin = styled(Spin)`
    svg {
        fill: ${colors.fermented.standard};
    }
`;

export default StyledSpin;
