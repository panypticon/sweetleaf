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
`;

export default StyledCartPopover;
