import styled from 'styled-components';

import Modal from '../modal/modal';
import { defaults, breakpoints, colors } from '../../root.styled';

const StyledDiscoverTasteModal = styled(Modal)`
    max-width: ${breakpoints.lg};
    padding: ${defaults.layoutPadding};

    .ant-modal-content {
        min-height: 72rem;
        display: flex;
        flex-direction: column;

        @media (max-width: ${breakpoints.lg}) {
            margin-top: 6rem;
            margin-bottom: 2.4rem;
            min-height: calc(100vh - 10.8rem);
        }

        .ant-modal-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    h4 {
        color: ${colors.contrast.dark};
    }

    .DiscoverTasteModal {
        &__Start {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: ${defaults.layoutPadding};

            p {
                text-align: center;
            }

            > *:nth-last-child(-n + 2) {
                margin-top: ${defaults.layoutPadding};
            }
        }
    }
`;

export default StyledDiscoverTasteModal;
