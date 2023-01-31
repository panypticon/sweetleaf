import StyledTag from './tag.styled';

interface Props {
    [x: string]: any;
}

const Tag = (props: Props) => <StyledTag className="Tag" {...props} />;

export default Tag;
