import { Modal } from 'antd';
import styled from 'styled-components';

import { defaults, colors } from '../../root.styled';

const StyledModal = styled(Modal)`
    max-width: 64rem;
    padding: 2.4rem;

    .ant-modal {
        &-title {
            margin-bottom: ${defaults.layoutPadding};
        }

        &-content {
            box-shadow: none;
            border-radius: unset;
            padding: calc(${defaults.layoutPadding} * 2);
        }

        &-close {
            top: 5.2rem;
            right: 4.4rem;
            width: 3.2rem;
            height: 3.2rem;

            &-x {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            &-icon {
                svg {
                    color: ${colors.contrast.dark};
                    width: 2.4rem;
                    height: 2.4rem;
                }
            }
        }
    }
`;

export default StyledModal;
