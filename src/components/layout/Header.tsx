import { NavLink } from 'react-router';
import { ScrollText, Trophy, Vault, type LucideIcon } from 'lucide-react';

const NAV_LINKS: { to: string; label: string; Icon: LucideIcon }[] = [
    { to: '/', label: 'Contrats', Icon: ScrollText },
    { to: '/planque', label: 'La Planque', Icon: Vault },
    { to: '/tableau-de-chasse', label: 'Tableau de chasse', Icon: Trophy },
];

const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'nav-link nav-link--active' : 'nav-link');

export default function Header() {
    return (
        <header className="header">
            <NavLink to="/" className="header__logo">Cambriofil</NavLink>
            <nav aria-label="Navigation principale" className="header__menu">
                <ul className="header__nav">
                    {NAV_LINKS.map(({ to, label, Icon }) => (
                        <li key={to}>
                            {/* end : "/" ne doit être actif que sur l'accueil, pas sur toutes les pages */}
                            <NavLink to={to} end={to === '/'} className={navClass}>
                                <Icon aria-hidden="true" size={20} />
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}