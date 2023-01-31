import Modal from '../modal/modal';
import styled from 'styled-components';

import { defaults } from '../../root.styled';

const StyledLoginModal = styled(Modal)`
    .Tag {
        margin-bottom: ${defaults.layoutPadding};
        width: 100%;
        text-align: center;
    }

    .Button:first-of-type {
        margin-top: ${defaults.layoutPadding};
    }
`;

export default StyledLoginModal;
