import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../root.styled';

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

export const StyledMenuBlade = styled.div`
    position: absolute;
    top: 6rem;
    left: 0;
    right: 0;
    background-color: ${colors.contrast.light};
`;
