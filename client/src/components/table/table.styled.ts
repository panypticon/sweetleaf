import styled from 'styled-components';
import { rgba } from 'polished';

import { Table } from 'antd';
import { colors } from '../../root.styled';

const StyledTable = styled(Table)`
    &.ant-table-wrapper {
        .ant-table-container {
            .ant-table-content {
                .ant-table-cell {
                    border-color: ${colors.contrast['shade-6']};

                    &-row-hover {
                        background-color: ${rgba(colors.contrast.dark, 0.025)};
                    }
                }
            }
        }
    }
`;

export default StyledTable;
