import { Tag } from 'antd';
import styled from 'styled-components';

import { colors } from '../../root.styled';

const StyledTag = styled(Tag)`
    &.ant-tag {
        border-radius: unset;

        &-error {
            border-color: ${colors.herbal.standard};
            background-color: ${colors.herbal.standard};
            color: ${colors.contrast.light};
        }
    }
`;

export default StyledTag;
