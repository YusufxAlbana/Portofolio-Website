import React from 'react'
import { Icon } from './Icon'

export function SidebarRight({ techStack, profile }) {
    const techs = techStack || []

    const CONNECT_LINKS = [
        { icon: <Icon.GitHub />, name: 'GitHub', url: 'https://github.com/YusufxAlbana' },
        { icon: <Icon.LinkedIn />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/yusuf-nawaf-albana-1b493931b/' },
        { icon: <Icon.MailIcon />, name: 'Email', url: `mailto:${profile?.email}` },
        { icon: <Icon.Phone />, name: 'WhatsApp', url: 'https://wa.me/6285168845761' },
        { icon: <Icon.Facebook />, name: 'Facebook', url: '' },
        { icon: <Icon.Instagram />, name: 'Instagram', url: '#' },
    ]

    return (
        <aside className="sidebar-right">
            {/* Tech Stack */}
            <div className="info-box">
                <div className="info-box-header">Tech Stack</div>
                <div className="tech-scroll">
                    {techs.length > 0 ? (
                        techs.map((tech, i) => (
                            <span className="tech-chip" key={i}>{tech}</span>
                        ))
                    ) : (
                        <span className="empty-tech">Loading...</span>
                    )}
                </div>
            </div>

            {/* Connect with me */}
            <div className="info-box">
                <div className="info-box-header">Connect with me</div>
                {CONNECT_LINKS.map((link, i) => (
                    <a href={link.url} className="connect-item" key={i} target="_blank" rel="noopener noreferrer">
                        <div className="connect-icon">{link.icon}</div>
                        <div className="follow-name">{link.name}</div>
                    </a>
                ))}
            </div>

            {/* Footer */}
            <div className="sidebar-footer">
                <a href={`https://${profile?.website}`} target="_blank" rel="noopener noreferrer">© 2026 {profile?.website}</a>
            </div>
        </aside>
    )
}
