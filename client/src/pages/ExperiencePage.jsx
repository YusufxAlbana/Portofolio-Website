import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from '../components/Icon'

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    })
}

export function ExperiencePage({ experience }) {
    const sortedExp = experience ? [...experience].sort((a, b) => b.id - a.id) : []

    return (
        <main className="main-feed">
            <motion.div
                className="feed-header"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1>Experience</h1>
            </motion.div>

            {sortedExp.map((exp, i) => (
                <motion.article
                    className="post-card"
                    key={exp.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                    <div className="post-content" style={{ width: '100%' }}>
                        <div className="post-header">
                            <span className="post-name">{exp.role}</span>
                            <span className="post-handle">@ {exp.company}</span>
                            <span className="post-dot">·</span>
                            <span className="post-time">{exp.duration}</span>
                        </div>
                        <div className="post-text">{exp.desc}</div>
                    </div>
                </motion.article>
            ))}

            {sortedExp.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ padding: '20px', color: 'var(--text-secondary)', textAlign: 'center' }}
                >
                    No experience added yet.
                </motion.div>
            )}
        </main>
    )
}
