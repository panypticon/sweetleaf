import styled from 'styled-components';

import Modal from '../modal/modal';
import { defaults } from '../../root.styled';

const StyledSignupModal = styled(Modal)`
    .SignupModal {
        &--success {
            p:not(:last-child) {
                margin-bottom: ${defaults.layoutPadding};
            }

            .Button {
                margin-left: calc(${defaults.layoutPadding} / 2);
            }
        }
    }
`;

export default StyledSignupModal;
