import type { TagProps } from 'antd';

import StyledTag from './tag.styled';

const Tag = (props: TagProps) => <StyledTag className="Tag" {...props} />;

export default Tag;
