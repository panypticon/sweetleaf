import StyledButton from './button.styled';

import type { LaxProps } from '../../types';

const Button = (props: LaxProps): JSX.Element => {
    const { wide, className, ...otherProps } = props;
    return <StyledButton className={`Button ${props.wide ? 'Button--wide' : ''} ${className || ''}`} {...otherProps} />;
};

export default Button;
