import type { LaxProps } from '../../types';

import StyledPopover from './popover.styled';

const Popover = (props: LaxProps): JSX.Element => (
    <StyledPopover
        className="Popover"
        destroyTooltipOnHide={true}
        mouseEnterDelay={0}
        mouseLeaveDelay={0.1}
        {...props}
    />
);

export default Popover;
