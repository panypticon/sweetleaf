import { InputRef } from 'antd';
import { forwardRef } from 'react';

import StyledInput from './input.styled';

interface Props {
    [x: string]: any;
}

const Input = forwardRef<InputRef, Props>(
    (props: Props, ref): JSX.Element => <StyledInput className="Input" ref={ref} {...props} />
);

export default Input;
