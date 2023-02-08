import { Popover } from 'antd';
import styled from 'styled-components';

const StyledPopover = styled(Popover).attrs(props => ({
    overlayClassName: `${props.overlayClassName} ${props.className}`
}))``;

export default StyledPopover;
