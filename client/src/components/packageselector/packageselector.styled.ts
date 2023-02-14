import styled from 'styled-components';
import { defaults, colors } from '../../root.styled';

const StyledPackageSelector = styled.div`
    margin: calc(${defaults.layoutPadding} * 2) 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${defaults.layoutPadding};

    h3 {
        color: ${colors.contrast.dark};
        line-height: 1;
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
                border-color: ${colors.oolong['lighter-2']};
                color: ${colors.contrast.dark};
            }

            &::before {
                display: none;
            }

            &-checked {
                border-color: ${colors.oolong.standard};
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
