import React from 'react'
import { motion } from 'framer-motion'

/* Default SVG icon for skills without a logo */
const DefaultSkillIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
)

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.05 }
    }
}

const cardVariant = {
    hidden: { opacity: 0, y: 24, scale: 0.92 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
    }
}

export function SkillsPage({ skills }) {
    if (!skills) return <div className="loading">Loading skills...</div>

    const techStack = (skills.techStack || []).map(t =>
        typeof t === 'string' ? { name: t, logo: '' } : t
    )

    return (
        <main className="main-feed">
            <motion.div
                className="feed-header"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1>Skills & Technologies</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tools and technologies I work with</p>
            </motion.div>

            <motion.div
                className="skill-showcase-grid"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {techStack.map((skill, i) => (
                    <motion.div
                        className="skill-showcase-card"
                        key={i}
                        variants={cardVariant}
                        whileHover={{
                            y: -6,
                            scale: 1.04,
                            transition: { duration: 0.25 }
                        }}
                    >
                        <div className="skill-showcase-glow" />
                        <div className="skill-showcase-logo">
                            {skill.logo ? (
                                <img src={skill.logo} alt={skill.name} />
                            ) : (
                                <DefaultSkillIcon />
                            )}
                        </div>
                        <span className="skill-showcase-name">{skill.name}</span>
                    </motion.div>
                ))}
            </motion.div>

            {techStack.length === 0 && (
                <div style={{ padding: '60px 16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No skills added yet.
                </div>
            )}
        </main>
    )
}
