import StyledSelect from './select.styled';

import type { SelectProps } from 'antd';

const Select = (props: SelectProps): JSX.Element => (
    <StyledSelect
        getPopupContainer={trigger => trigger.closest('.ant-select')}
        dropdownAlign={{
            offset: [0, 0]
        }}
        {...props}
    />
);

export default Select;
