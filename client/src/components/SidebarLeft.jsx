import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Icon } from './Icon'

export function SidebarLeft({ profile }) {
    const sections = [
        { id: 'profile', icon: <Icon.User />, label: 'Profile', path: '/' }, // Root points to profile usually
        { id: 'projects', icon: <Icon.Layers />, label: 'Projects', path: '/projects' },
        { id: 'skills', icon: <Icon.Zap />, label: 'Skills', path: '/skills' },
        { id: 'experience', icon: <Icon.Briefcase />, label: 'Experience', path: '/experience' },
        { id: 'education', icon: <Icon.GraduationCap />, label: 'Education', path: '/education' },
        { id: 'blog', icon: <Icon.Edit />, label: 'Blog', path: '/blog' },
    ]

    return (
        <aside className="sidebar-left">
            <Link to="/" className="sidebar-logo">
                <img src="/assets/images/logo YNA.svg" alt="YNA" />
            </Link>

            <nav className="sidebar-nav">
                {sections.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) => `sidebar-nav-item ${isActive || (item.id === 'profile' && window.location.pathname === '/profile') ? 'active' : ''}`} // Handle both / and /profile for profile
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-status">
                <span className="status-dot" />
                <span>Available for hire</span>
            </div>

            <a href={`https://wa.me/6285168845761`} className="sidebar-cta">Hubungi Saya</a>

            <div className="sidebar-profile">
                <div className="sidebar-avatar"><img src={profile.photo} alt="Profile" /></div>
                <div className="sidebar-profile-info">
                    <div className="sidebar-profile-name">{profile.name}</div>
                    <div className="sidebar-profile-handle">{profile.handle}</div>
                </div>
            </div>
        </aside>
    )
}
