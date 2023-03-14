import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors, defaults } from '../../root.styled';
import { rgba } from 'polished';

export const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited,
    &:hover,
    &:active {
        text-decoration: none;
        color: ${colors.contrast.dark};
        font-weight: 600;
    }

    &:hover {
        border-bottom: 0.2rem solid ${colors.steamed.standard};
        padding-bottom: 0.2rem;
    }

    &.active {
        color: ${colors.steamed.standard};
    }
`;

export const StyledMenu = styled.ul`
    padding: 0 ${defaults.layoutPadding};
    margin: 0 -2.4rem;
`;

export const StyledMenuBlade = styled.div`
    position: absolute;
    top: 6rem;
    left: 0;
    right: 0;
    backdrop-filter: blur(5rem);
    background: ${rgba(colors.steamed['lighter-4'], 0.8)};
    max-width: ${defaults.layoutMaxWidth};
    padding: ${defaults.layoutPadding};
    margin: 0 auto;

    a:link,
    a:visited,
    a:hover,
    a:active {
        text-decoration: none;
        color: ${colors.contrast.dark};
        font-weight: 600;
    }

    a:hover {
        border-bottom: 0.2rem solid ${colors.steamed.standard};
        padding-bottom: 0.2rem;
    }
`;
