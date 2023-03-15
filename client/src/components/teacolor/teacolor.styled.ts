import styled from 'styled-components';
import { rgba } from 'polished';

import { defaults, colors, breakpoints } from '../../root.styled';

const StyledTeaColor = styled.li`
    list-style: none;
    position: relative;

    &:hover {
        transform: scale(1.075);
        transition: all 0.15s ease-in;
    }

    &:nth-of-type(2n) {
        transform: translateY(${defaults.layoutPadding});

        &:hover {
            transform: scale(1.05) translateY(${defaults.layoutPadding});
        }

        @media (max-width: ${breakpoints.lg}) {
            transform: unset;

            &:hover {
                transform: scale(1.05);
            }
        }
    }

    p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: ${colors.oolong.standard};
        box-shadow: ${rgba(colors.contrast.dark, 0.05)} 0px 0px 1.2rem;
        padding: 0.4rem 0.8rem;
        border-radius: ${defaults.radiusDefault};
    }

    img {
        width: 100%;
    }

    a {
        &:link,
        &:visited,
        &:hover,
        &:active {
            color: ${colors.contrast.dark};
            font-weight: 600;
        }
    }
`;

export default StyledTeaColor;
