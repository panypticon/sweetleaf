import { Input } from 'antd';
import styled from 'styled-components';

import { colors } from '../../root.styled';

const StyledInput = styled(Input)`
    &,
    input {
        caret-color: ${colors.steamed.standard};
    }

    &::-webkit-search-cancel-button,
    input::-webkit-search-cancel-button {
        -webkit-appearance: none;
        display: none;
    }
`;

export default StyledInput;
