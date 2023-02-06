import { Modal } from 'antd';
import styled from 'styled-components';
import { rgba } from 'polished';

import { defaults, colors } from '../../root.styled';

const StyledModal = styled(Modal)`
    max-width: 64rem;
    padding: 2.4rem;

    .ant-modal {
        &-title {
            margin-bottom: ${defaults.layoutPadding};
        }

        &-content {
            box-shadow: 0 0 1.2rem ${rgba(colors.contrast.dark, 0.075)};
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

    .Modal {
        &__switch {
            font-size: 1.4rem;
            margin-top: calc(${defaults.layoutPadding} / 2);

            span {
                color: ${colors.fermented.standard};

                &:hover {
                    border-bottom: 0.1rem solid ${colors.fermented['lighter-4']};
                    padding-bottom: 0.1rem;
                    cursor: pointer;
                }
            }
        }

        &__separator {
            margin: ${defaults.layoutPadding} 0;
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

export default StyledModal;
