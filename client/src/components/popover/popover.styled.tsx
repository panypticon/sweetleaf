import { Popover } from 'antd';
import styled from 'styled-components';
import { rgba } from 'polished';

import { colors, defaults } from '../../root.styled';

const StyledPopover = styled(Popover).attrs(props => ({
    overlayClassName: `${props.overlayClassName} ${props.className}`
}))`
    ~ div .ant-popover {
        max-width: 28rem;
        width: 100%;

        &-inner {
            border-radius: unset;
            padding: ${defaults.layoutPadding};
        }

        &-inner,
        &-arrow::after {
            box-shadow: 0 0 1.2rem ${rgba(colors.contrast.dark, 0.1)};
        }
    }
`;

export default StyledPopover;
