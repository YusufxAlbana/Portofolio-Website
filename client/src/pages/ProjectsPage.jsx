import React from 'react'
import { Icon } from '../components/Icon'
import { TimeAgo } from '../components/TimeAgo'

export function ProjectsPage({ profile, projects }) {
    if (!projects) return <div className="loading">Loading projects...</div>

    return (
        <main className="main-feed">


            {projects.length === 0 ? (
                <div className="empty-state">No projects yet.</div>
            ) : (
                projects.map((proj, i) => (
                    <article className="post-card" key={proj.id || i}>
                        <div className="post-avatar"><img src={profile.photo} alt="Profile" /></div>
                        <div className="post-content">
                            <div className="post-header">
                                <span className="post-name">{profile.name}</span>
                                <span className="post-handle">{profile.handle}</span>
                                <span className="post-dot">·</span>
                                <span className="post-time"><TimeAgo timestamp={proj.time} /></span>
                            </div>
                            <div className="post-text">{proj.text}</div>
                            <div className="post-attachment">
                                <div className="post-attachment-preview">
                                    <div className="post-attachment-title">{proj.title}</div>
                                    <div className="post-attachment-desc">{proj.desc}</div>
                                    <div className="post-attachment-tags">
                                        {proj.tags.map((tag) => (
                                            <span className="post-attachment-tag" key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))
            )}
        </main>
    )
}
