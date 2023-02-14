import styled from 'styled-components';
import { defaults, colors } from '../../root.styled';

const StyledPackageSelector = styled.div`
    margin: calc(${defaults.layoutPadding} * 2) 0;
    display: flex;
    flex-direction: column;
    gap: ${defaults.layoutPadding};

    .PackageSelector {
        &__add {
            display: flex;
            gap: ${defaults.layoutPadding};
            margin-top: ${defaults.layoutPadding};

            .ant-input-group {
                width: auto;
            }
        }

        &__config {
            display: flex;
            gap: calc(${defaults.layoutPadding} * 2);
        }
    }

    h3 {
        color: ${colors.contrast.dark};
        line-height: 1;
    }

    .ant-input-group {
        .ant-btn {
            border-width: 0.2rem;
            margin: 0;

            &:disabled {
                border-color: ${colors.contrast['shade-6']};
                color: ${colors.contrast['shade-5']};
            }
        }

        .ant-input-number {
            margin: 0;
            border-left-width: 0;
            border-right-width: 0;
            width: 5rem;

            &-focused {
                border-color: ${colors.contrast['shade-6']};
                box-shadow: none;
            }

            input {
                text-align: center;
            }
        }
    }

    .ant-radio {
        &-group {
            font-weight: 600;
            display: flex;
            gap: ${defaults.layoutPadding};
        }

        &-button-wrapper {
            border-width: 0.2rem;
            border-radius: ${defaults.radiusDefault};
            border-color: ${colors.contrast['shade-6']};
            display: flex;
            align-items: center;

            &:hover {
                border-color: ${colors.steamed['lighter-2']};
                color: ${colors.contrast.dark};
            }

            &::before {
                display: none;
            }

            &-checked.ant-radio-button-wrapper {
                border-color: ${colors.steamed.standard};
                color: ${colors.contrast.dark};
            }

            &-disabled {
                &,
                &:hover {
                    background-color: transparent;
                    border-color: ${colors.contrast['shade-6']};
                    color: ${colors.contrast['shade-5']};
                }
            }
        }
    }
`;

export default StyledPackageSelector;
