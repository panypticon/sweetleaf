import { Popover } from 'antd';
import styled from 'styled-components';
import { rgba } from 'polished';

import { colors, defaults } from '../../root.styled';

// Add wrapper component to funnel styled-components' className prop into the required overlayClassName prop
const PopoverWrapper = ({
    className,
    overlayClassName,
    ...props
}: {
    overlayClassName: String;
    className?: JSX.Element;
    [x: string]: any;
}): JSX.Element => (
    <>
        <Popover overlayClassName={`${overlayClassName} ${className}`} {...props} />
    </>
);

const StyledPopover = styled(PopoverWrapper)`
    .ant-popover {
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
