import StyledSelect from './select.styled';

import type { SelectProps } from 'antd';

const Select = (props: SelectProps): JSX.Element => <StyledSelect {...props} />;

export default Select;
