import styled from 'styled-components';

import Popover from '../popover/popover';
import { defaults, colors } from '../../root.styled';

const StyledAccountPopover = styled(Popover)`
    .AccountPopover {
        &__signup {
            margin-top: 2.4rem;

            p {
                margin-bottom: 0.8rem;
            }
        }

        &__items {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            cursor: pointer;

            a {
                &:link,
                &:visited,
                &:active {
                    color: inherit;
                }
            }

            a,
            span {
                display: block;

                &:hover {
                    color: ${colors.fermented.standard};
                }
            }
        }
    }

    .ant-popover {
        &-arrow {
            right: 1.2rem;
        }

        &-title {
            margin-bottom: ${defaults.layoutPadding};
        }
    }
`;

export default StyledAccountPopover;
