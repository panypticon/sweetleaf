import { Modal } from 'antd';
import styled from 'styled-components';

import { defaults } from '../../root.styled';

const StyledModal = styled(Modal)`
    .ant-modal {
        &-content {
            box-shadow: none;
            border-radius: unset;
            padding: calc(${defaults.layoutPadding} * 2);
        }
    }
`;

export default StyledModal;
