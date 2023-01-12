import StyledInput from './input.styled';

interface Props {
    [x: string]: any;
}

const Input = (props: Props): JSX.Element => <StyledInput className="Input" {...props} />;

export default Input;
