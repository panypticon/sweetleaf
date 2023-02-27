import { Select } from 'antd';
import styled from 'styled-components';
import { rgba } from 'polished';

import { colors } from '../../root.styled';

import type { SelectProps } from 'antd';

const StyledSelect = styled(Select<SelectProps>)`
    &.ant-select {
        &:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) {
            &.ant-select:hover {
                .ant-select-selector {
                    border-color: ${colors.steamed['lighter-3']};
                }
            }
            &.ant-select-focused,
            &.ant-select-focused:hover {
                .ant-select-selector {
                    border-color: ${colors.steamed.standard};
                }
            }
        }

        &-open {
            .ant-select-selector {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }
        }

        &-focused:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) {
            .ant-select-selector {
                box-shadow: none;
            }
        }
    }

    .ant-select {
        &-dropdown {
            padding: 0;
            box-shadow: 0 0 1.2rem ${rgba(colors.contrast.dark, 0.1)};
            border: 0.1rem solid ${colors.contrast['shade-6']};
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        &-item {
            border-radius: unset;

            &-option-active:not(.ant-select-item-option-disabled) {
                background-color: ${rgba(colors.contrast['shade-6'], 0.33333)};
            }

            &-option-selected:not(.ant-select-item-option-disabled) {
                background-color: ${rgba(colors.fermented['lighter-4'], 0.33333)};
                font-weight: 400;
            }
        }
    }
`;

export default StyledSelect;
