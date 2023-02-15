import { Rate } from 'antd';
import styled from 'styled-components';

import { colors } from '../../root.styled';

const StyledRate = styled(Rate)`
    .ant-rate-star {
        color: ${colors.oolong.standard};

        &-second,
        &-first {
            color: ${colors.contrast['shade-6']};
        }
    }
`;

export default StyledRate;
