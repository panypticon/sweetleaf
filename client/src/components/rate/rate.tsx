import StyledRate from './rate.styled';

interface Props {
    [x: string]: any;
}

const Rate = (props: Props) => <StyledRate className="Rate" {...props} />;

export default Rate;
