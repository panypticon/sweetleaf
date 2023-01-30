import StyledLoginModal from './loginmodal.styled';

interface Props {
    [x: string]: any;
}

const LoginModal = (props: Props) => <StyledLoginModal title="Log in" footer={null} {...props} />;

export default LoginModal;
