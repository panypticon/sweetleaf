import styled from 'styled-components';

import Popover from '../popover/popover';
import { defaults, colors } from '../../root.styled';

const StyledCartPopover = styled(Popover)`
    ul {
        list-style: none;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: calc(${defaults.layoutPadding} / 2);
    }

    .CartPopover {
        &__total {
            display: flex;
            justify-content: space-between;
            font-weight: 600;
            padding-top: calc(${defaults.layoutPadding} / 2);
            border-top: 0.2rem solid ${colors.contrast['shade-6']};
            margin-top: calc(${defaults.layoutPadding} / 2);
        }

        &__checkout {
            margin-top: ${defaults.layoutPadding};
        }

        &__empty {
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 1.8rem;
            color: ${colors.contrast['shade-3']};

            span.anticon.anticon-coffee svg {
                color: ${colors.fermented['lighter-3']};
                width: 3.2rem;
                height: 3.2rem;
            }
        }
    }

    .CartPopoverItem {
        &:not(:last-of-type) {
            border-bottom: 0.1rem solid ${colors.contrast['shade-6']};
            padding-bottom: calc(${defaults.layoutPadding} / 2);
        }

        img {
            width: 3.6rem;
            mix-blend-mode: multiply;
        }

        h6 {
            color: ${colors.fermented.standard};
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 0.4rem;
        }

        &__specs {
            display: flex;
            gap: calc(${defaults.layoutPadding} / 2);
            align-items: center;
            justify-content: space-between;
        }

        &__amount {
            display: flex;
            gap: 0.4rem;
            align-items: center;

            span.anticon {
                &.anticon-plus-circle,
                &.anticon-minus-circle {
                    svg {
                        width: 1.6rem;
                        height: 1.6rem;
                        color: ${colors.oolong.standard};

                        &:hover {
                            color: ${colors.oolong['lighter-1']};
                        }
                    }
                }
            }

            > span {
                min-width: 2rem;
                text-align: center;
            }
        }

        &__price {
            font-weight: 600;
        }
    }
`;

export default StyledCartPopover;
