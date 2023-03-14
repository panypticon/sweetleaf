import { useState, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { Link } from 'react-router-dom';

import { getJSONData } from '../../api/fetch';

import type { MouseEvent } from 'react';

import { StyledNavLink, StyledMenuBlade, StyledMenu } from './menu.styled';

const MenuBlade = ({
    content,
    onMouseLeave
}: {
    content: JSX.Element;
    onMouseLeave: (evt: MouseEvent) => void;
}): JSX.Element => (
    <StyledMenuBlade className="MenuBlade" onMouseLeave={onMouseLeave}>
        {content}
    </StyledMenuBlade>
);

const Menu = (): JSX.Element => {
    const [menuBladeContent, setMenuBladeContent] = useState<JSX.Element | null>(null);

    const { data } = useRequest(() => getJSONData('/api/v1/products/categories'));

    const menuItems = useMemo(
        () => [
            {
                label: 'Tea',
                link: '/tea',
                content: () =>
                    data.tea ? (
                        <ul>
                            {data.tea.map((category: string) => (
                                <li key={category}>
                                    <Link to={`/tea/${category}`}>{category}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : null
            },
            {
                label: 'Gear',
                link: '/gear',
                content: () =>
                    data.gear ? (
                        <ul>
                            {data.gear.map((category: string) => (
                                <li key={category}>
                                    <Link to={`/gear/${category}`}>{category}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : null
            },
            { label: 'About', link: '/about', content: null }
        ],
        [data]
    );

    const hideBladefromMenu = (evt: MouseEvent): void => {
        const node = evt.target as HTMLElement;
        const container = node.closest('ul.Menu');
        if (container) {
            const { left: leftBoundary, right: rightBoundary } = container.getBoundingClientRect();
            if (evt.pageX < leftBoundary || evt.pageX > rightBoundary) setMenuBladeContent(null);
        }
    };

    const hideBladefromBlade = (evt: MouseEvent): void => {
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
