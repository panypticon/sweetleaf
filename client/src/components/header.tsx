import { Layout } from 'antd';
import styled from 'styled-components';
import { rgba } from 'polished';

import { colors } from '../root.styled';

const StyledHeader = styled(Layout.Header)`
    &.ant-layout-header {
        backdrop-filter: blur(5rem);
        background: ${rgba(colors.contrast.light, 0.8)};
        height: 6rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
`;

const Header = (): JSX.Element => <StyledHeader className="Header">Header</StyledHeader>;

export default Header;
