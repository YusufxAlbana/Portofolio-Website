import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from './Icon'

export function MobileNav() {
    return (
        <nav className="mobile-nav">
            <NavLink to="/" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`} end>
                <Icon.User />
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
                <Icon.Layers />
            </NavLink>
            <NavLink to="/skills" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
                <Icon.Zap />
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
                <Icon.Edit />
            </NavLink>
        </nav>
    )
}
