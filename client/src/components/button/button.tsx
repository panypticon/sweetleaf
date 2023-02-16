import StyledButton from './button.styled';

interface Props {
    [x: string]: any;
}

const Button = (props: Props): JSX.Element => {
    const { wide, className, ...otherProps } = props;
    return <StyledButton className={`Button ${props.wide ? 'Button--wide' : ''} ${className}`} {...otherProps} />;
};

export default Button;
