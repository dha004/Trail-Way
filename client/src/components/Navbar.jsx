import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useScrollSpy from '../hooks/useScrollSpy';

export default function Navbar() {
    const sectionIds = ['home', 'about', 'services'];
    const activeId = useScrollSpy(sectionIds);
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';

    const handleAnchorClick = (e, sectionId) => {
        e.preventDefault();
        if (!isHome) {
            navigate('/');
            setTimeout(() => {
                if (sectionId === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const el = document.getElementById(sectionId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            if (sectionId === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <img src="/images/TrailWaylogo.png" alt="TrailWay logo" className="h-10 w-auto object-contain -mt-3" />
            </div>

            {/* Navigation Links */}
            <div className="space-x-2 flex">
                <a
                    href="#home"
                    onClick={(e) => handleAnchorClick(e, 'home')}
                    className={`px-4 py-2 rounded-full font-semibold inline-block transition-all duration-200 ${isHome && activeId === 'home'
                        ? 'bg-blue-100 text-blue-700 scale-105'
                        : 'text-blue-600 hover:bg-blue-50 hover:scale-105'
                        }`}
                >
                    Home
                </a>
                <a
                    href="#about"
                    onClick={(e) => handleAnchorClick(e, 'about')}
                    className={`px-4 py-2 rounded-full font-semibold inline-block transition-all duration-200 ${isHome && activeId === 'about'
                        ? 'bg-blue-100 text-blue-700 scale-105'
                        : 'text-blue-600 hover:bg-blue-50 hover:scale-105'
                        }`}
                >
                    About
                </a>
                <a
                    href="#services"
                    onClick={(e) => handleAnchorClick(e, 'services')}
                    className={`px-4 py-2 rounded-full font-semibold inline-block transition-all duration-200 ${isHome && activeId === 'services'
                        ? 'bg-blue-100 text-blue-700 scale-105'
                        : 'text-blue-600 hover:bg-blue-50 hover:scale-105'
                        }`}
                >
                    Services
                </a>
                <NavLink
                    to="/trails"
                    className={({ isActive }) =>
                        (isActive
                            ? 'bg-blue-100 text-blue-700 scale-105'
                            : 'text-blue-600 hover:bg-blue-50 hover:scale-105') +
                        ' transition-all duration-200 px-4 py-2 rounded-full font-semibold inline-block'
                    }
                >
                    Trails
                </NavLink>
            </div>
        </nav>
    );
}
