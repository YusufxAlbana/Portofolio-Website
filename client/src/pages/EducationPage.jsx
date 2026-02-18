import React from 'react'
import { Icon } from '../components/Icon'

export function EducationPage({ education }) {
    const sortedEdu = education ? [...education].sort((a, b) => b.time - a.time) : []

    return (
        <main className="main-feed">
            <div className="feed-header">
                <h1>Education</h1>
            </div>

            <div className="edu-timeline">
                <div className="edu-timeline-line"></div>

                {sortedEdu.map((edu, index) => (
                    <div className={`edu-timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={edu.id}>
                        <div className="edu-timeline-dot"></div>
                        <div className="edu-card">
                            <div className="edu-card-top">
                                <div className="edu-card-logo">
                                    {edu.logo ? (
                                        <img src={edu.logo} alt={edu.school} />
                                    ) : (
                                        <Icon.GraduationCap />
                                    )}
                                </div>
                                <div className="edu-card-header">
                                    <h3 className="edu-school">{edu.school}</h3>
                                    {edu.degree && <p className="edu-degree">{edu.degree}</p>}
                                    {edu.major && <p className="edu-major">{edu.major}</p>}
                                </div>
                            </div>

                            <div className="edu-card-meta">
                                <span className="edu-meta-item">
                                    <Icon.Calendar /> {edu.duration}
                                </span>
                                {edu.location && (
                                    <span className="edu-meta-item">
                                        <Icon.MapPin /> {edu.location}
                                    </span>
                                )}
                            </div>

                            {edu.desc && <p className="edu-desc">{edu.desc}</p>}

                            {edu.currentlyEnrolled && (
                                <div className="edu-badge">
                                    <span className="edu-badge-dot"></span>
                                    Currently Enrolled
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {sortedEdu.length === 0 && (
                    <div style={{ padding: '40px 20px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                        No education added yet.
                    </div>
                )}
            </div>
        </main>
    )
}
