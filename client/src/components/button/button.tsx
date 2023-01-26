import StyledButton from './button.styled';

interface Props {
    [x: string]: any;
}

const Button = (props: Props): JSX.Element => {
    const { wide, ...otherProps } = props;
    return <StyledButton className={`Button ${props.wide ? 'Button--wide' : ''}`} {...otherProps} />;
};

export default Button;
