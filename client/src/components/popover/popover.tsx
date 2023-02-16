import StyledPopover from './popover.styled';

interface Props {
    [x: string]: any;
}

const Popover = (props: Props): JSX.Element => (
    <StyledPopover
        className="Popover"
        destroyTooltipOnHide={true}
        mouseEnterDelay={0}
        mouseLeaveDelay={0.1}
        {...props}
    />
);

export default Popover;
