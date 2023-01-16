import React, { useState } from 'react';

import { StyledNavLink, StyledMenuBlade, StyledMenu } from './menu.styled';

const menuItems = [
    { label: 'Tea', link: '/tea', content: () => <div>Tea</div> },
    { label: 'Gear', link: '/gear', content: () => <div>Gear</div> },
    { label: 'MyBox', link: '/mybox', content: () => <div>MyBox</div> },
    { label: 'About', link: '/about', content: () => <div>About</div> }
];

const MenuBlade = ({
    content,
    onMouseLeave
}: {
    content: JSX.Element;
    onMouseLeave: (evt: React.MouseEvent) => void;
}): JSX.Element => (
    <StyledMenuBlade className="MenuBlade" onMouseLeave={onMouseLeave}>
        {content}
    </StyledMenuBlade>
);

const Menu = (): JSX.Element => {
    const [menuBladeContent, setMenuBladeContent] = useState<JSX.Element | null>(null);

    const hideBladefromMenu = (evt: React.MouseEvent): void => {
        const node = evt.target as HTMLElement;
        const container = node.closest('ul.Menu');
        if (container) {
            const { left: leftBoundary, right: rightBoundary } = container.getBoundingClientRect();
            if (evt.pageX < leftBoundary || evt.pageX > rightBoundary) setMenuBladeContent(null);
        }
    };

    const hideBladefromBlade = (evt: React.MouseEvent): void => {
        const node = evt.target as HTMLElement;
        const container = node.closest('div.MenuBlade');
        if (container) {
            const {
                left: leftBoundary,
                right: rightBoundary,
                bottom: bottomBoundary
            } = container.getBoundingClientRect();
            if (evt.pageX < leftBoundary || evt.pageX > rightBoundary || evt.pageY >= bottomBoundary)
                setMenuBladeContent(null);
        }
    };

    return (
        <>
            <StyledMenu className="Menu" onMouseLeave={hideBladefromMenu}>
                {menuItems.map(({ label, link, content }, i) => (
                    <li key={i} onMouseEnter={() => setMenuBladeContent(content)}>
                        <StyledNavLink to={link}>{label}</StyledNavLink>
                    </li>
                ))}
            </StyledMenu>
            {menuBladeContent && <MenuBlade content={menuBladeContent} onMouseLeave={hideBladefromBlade} />}
        </>
    );
};

export default Menu;
