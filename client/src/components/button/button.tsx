import StyledButton from './button.styled';

interface Props {
    [x: string]: any;
}

const Button = (props: Props): JSX.Element => <StyledButton className="Button" {...props} />;

export default Button;
