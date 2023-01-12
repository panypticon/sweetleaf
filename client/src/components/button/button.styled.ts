import { Button } from 'antd';
import styled from 'styled-components';

import { colors } from '../../root.styled';

const StyledButton = styled(Button)`
    &.ant-btn {
        font-weight: 600;
        box-shadow: unset;
        padding: 0 1.5rem;

        &:hover {
            color: currentColor;
        }

        &-default {
            border: 0.2rem solid ${colors.oolong.standard};
            padding: 0 1.4rem;
        }
    }
`;

export default StyledButton;
