import React from 'react'

export function SkillsPage({ skills }) {
    if (!skills) return <div className="loading">Loading skills...</div>

    const categories = skills.categories || []
    const techStack = skills.techStack || []

    return (
        <main className="main-feed">


            {/* Skill categories as cards */}
            <div className="skills-page-grid">
                {categories.map((skill) => (
                    <div className="skill-card" key={skill.label}>
                        <div className="skill-card-header">
                            <span className="skill-card-icon">💡</span>
                            <h3>{skill.label}</h3>
                        </div>
                        <div className="skill-card-tags">
                            {skill.tags.map((tag) => (
                                <span className="skill-card-tag" key={tag}>{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* All tech as chips */}
            <div className="skills-all-section">
                <h3 className="skills-all-title">All Technologies</h3>
                <div className="tech-scroll-full">
                    {techStack.map((tech, i) => (
                        <span className="tech-chip" key={i}>{tech}</span>
                    ))}
                </div>
            </div>
        </main>
    )
}
