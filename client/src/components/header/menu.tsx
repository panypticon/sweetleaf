import { useState, useRef } from 'react';
import { useEffect } from 'react';

import { StyledNavLink, StyledMenuBlade } from './menu.styled';

const menuItems = [
    { label: 'Tea', link: '/tea', content: () => <div>Tea</div> },
    { label: 'Gear', link: '/gear', content: () => <div>Gear</div> },
    { label: 'MyBox', link: '/mybox', content: () => <div>MyBox</div> },
    { label: 'About', link: '/about', content: () => <div>About</div> }
];

const MenuBlade = ({ content }: { content: JSX.Element }): JSX.Element => (
    <StyledMenuBlade className="MenuBlade">{content}</StyledMenuBlade>
);

const Menu = (): JSX.Element => {
    const [menuBladeContent, setMenuBladeContent] = useState<JSX.Element | null>(null);

    const menuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const hideBlade = () => setMenuBladeContent(null);

        const menu = menuRef.current;

        if (menu) {
            menu.addEventListener('mouseleave', hideBlade);
            return () => menu.removeEventListener('mouseleave', hideBlade);
        }
    }, [menuRef]);

    return (
        <>
            <ul className="Menu" ref={menuRef}>
                {menuItems.map(({ label, link, content }, i) => (
                    <li key={i} onMouseEnter={() => setMenuBladeContent(content)}>
                        <StyledNavLink to={link}>{label}</StyledNavLink>
                    </li>
                ))}
            </ul>
            {menuBladeContent && <MenuBlade content={menuBladeContent} />}
        </>
    );
};

export default Menu;
