import styled from 'styled-components';
import { rgba } from 'polished';

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
            margin-bottom: ${defaults.layoutPadding};
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

    .ant-modal-footer {
        display: flex;
        justify-content: space-between;
    }

    h4 {
        color: ${colors.contrast.dark};
        margin-bottom: calc(${defaults.layoutPadding} * 2);
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

        &__Question {
            flex: 1;
            align-self: stretch;

            > div > p {
                background-color: ${colors.contrast['shade-6']};
                padding: ${defaults.layoutPadding};
                font-size: 1.4rem;
            }

            .ant-form-item {
                margin-bottom: calc(${defaults.layoutPadding} * 2);

                &-explain {
                    text-align: center;
                    padding-top: calc(${defaults.layoutPadding} / 2);
                }
            }
        }
    }

    .ant-steps {
        transform: translateX(calc(${defaults.layoutPadding} * -2));
        width: calc(100% + calc(${defaults.layoutPadding} * 4));
        margin-bottom: calc(${defaults.layoutPadding} * 2);

        .ant-steps-item-container {
            .ant-steps-item-tail::after {
                background-color: ${colors.contrast['shade-6']};
            }

            .ant-steps-item-icon .ant-steps-icon-dot {
                background-color: ${colors.contrast['shade-4']};
            }
        }

        &-item-active,
        &-item-finish {
            .ant-steps-item-container .ant-steps-item-icon .ant-steps-icon-dot {
                background-color: ${colors.fermented.standard};
            }
        }

        &-item-finish {
            .ant-steps-item-container .ant-steps-item-tail::after {
                background-color: ${colors.fermented.standard};
            }
        }
    }

    .ant-form-item-control-input-content {
        display: flex;
        justify-content: center;
    }

    .ant-radio-wrapper,
    .ant-checkbox-wrapper {
        font-weight: 600;
        color: ${colors.steamed.standard};
        padding: ${defaults.layoutPadding};
        border: 0.1rem solid ${colors.contrast['shade-6']};
        border-radius: ${defaults.radiusDefault};
        box-shadow: 0 0 1.2rem ${rgba(colors.contrast.dark, 0.15)};
        margin-right: 0;

        &:not(:last-child) {
            margin-right: calc(${defaults.layoutPadding} / 2);
        }

        .ant-radio,
        .ant-checkbox {
            margin-right: 0.4rem;

            &-inner {
                border-color: ${colors.contrast['shade-6']};
            }
        }

        &-checked,
        &-checked:hover {
            border-color: ${colors.steamed.standard};

            .ant-checkbox:not(.ant-checkbox-disabled)::after {
                border-color: ${colors.steamed.standard};
            }

            .ant-radio-inner,
            .ant-checkbox.ant-checkbox-checked .ant-checkbox-inner {
                border-color: ${colors.steamed.standard};
                background-color: ${colors.steamed.standard};
            }
        }

        &:hover {
            .ant-radio-inner,
            .ant-checkbox-inner {
                border-color: ${colors.steamed.standard};
            }
        }
    }
`;

export default StyledDiscoverTasteModal;
