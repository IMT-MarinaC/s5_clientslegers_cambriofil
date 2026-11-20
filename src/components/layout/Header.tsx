import { NavLink } from 'react-router';
import { ScrollText, Trophy, Vault, type LucideIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS: { to: string; label: string; Icon: LucideIcon }[] = [
    { to: '/', label: 'Contrats', Icon: ScrollText },
    { to: '/planque', label: 'La Planque', Icon: Vault },
    { to: '/tableau-de-chasse', label: 'Tableau de chasse', Icon: Trophy },
];

const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'nav-link nav-link--active' : 'nav-link');

export default function Header() {
    return (
        <header className="header">
            <NavLink to="/" className="header__logo">
                <svg viewBox="0 0 124 60" aria-hidden="true">
                    <path fill="currentColor" fillRule="evenodd" d="M14 28 Q38 2 62 18 Q86 2 110 28 Q112 58 86 58 Q71 58 62 46 Q53 58 38 58 Q12 58 14 28Z M28 34 a11 7 0 1 0 22 0 a11 7 0 1 0 -22 0Z M74 34 a11 7 0 1 0 22 0 a11 7 0 1 0 -22 0Z" />
                    <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M14 28 L4 16 M14 32 L2 42 M110 28 L120 16 M110 32 L122 42" />
                </svg>
                Cambriofil
            </NavLink>
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
            <ThemeToggle />
        </header>
    );
}