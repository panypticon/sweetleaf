import { LoadingOutlined } from '@ant-design/icons';

import StyledSpin from './spin.styled';

const Spin = () => <StyledSpin className="Spin" indicator={<LoadingOutlined style={{ fontSize: 72 }} />} />;

export default Spin;
