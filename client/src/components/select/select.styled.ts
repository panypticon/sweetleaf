import { Select } from 'antd';
import styled from 'styled-components';

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
    }
`;

export default StyledSelect;
