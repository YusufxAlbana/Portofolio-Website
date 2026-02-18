import React from 'react'
import { Icon } from '../components/Icon'

export function ExperiencePage({ experience }) {
    const sortedExp = experience ? [...experience].sort((a, b) => b.id - a.id) : []

    return (
        <main className="main-feed">
            <div className="feed-header">
                <h1>Experience</h1>
            </div>

            {sortedExp.map((exp) => (
                <article className="post-card" key={exp.id}>
                    <div className="post-content" style={{ width: '100%' }}>
                        <div className="post-header">
                            <span className="post-name">{exp.role}</span>
                            <span className="post-handle">@ {exp.company}</span>
                            <span className="post-dot">·</span>
                            <span className="post-time">{exp.duration}</span>
                        </div>
                        <div className="post-text">{exp.desc}</div>
                    </div>
                </article>
            ))}

            {sortedExp.length === 0 && (
                <div style={{ padding: '20px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    No experience added yet.
                </div>
            )}
        </main>
    )
}
