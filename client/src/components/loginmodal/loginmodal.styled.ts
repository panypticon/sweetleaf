import Modal from '../modal/modal';
import styled from 'styled-components';

import { defaults, colors } from '../../root.styled';

const StyledLoginModal = styled(Modal)`
    .Tag {
        margin-bottom: ${defaults.layoutPadding};
        width: 100%;
        text-align: center;
    }

    .Button:first-of-type {
        margin-top: ${defaults.layoutPadding};
    }

    .LoginModal {
        &__separator {
            margin-top: ${defaults.layoutPadding};
            position: relative;
            height: 2.4rem;
            display: block;

            > * {
                position: absolute;
                width: 100%;
            }

            hr {
                top: 1.2rem;
                border: 0;
                height: 0.1rem;
                background-color: ${colors.contrast['shade-6']};
            }

            div {
                z-index: 10;
                display: flex;
                justify-content: center;

                span {
                    background-color: ${colors.contrast.light};
                    display: inline-block;
                    padding: 0 0.8rem;
                }
            }
        }
    }
`;

export default StyledLoginModal;
