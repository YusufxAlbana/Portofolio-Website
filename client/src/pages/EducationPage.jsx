import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from '../components/Icon'

const itemVariants = {
    hidden: (dir) => ({
        opacity: 0,
        x: dir === 'left' ? -60 : 60
    }),
    visible: (dir) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    })
}

const dotVariant = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: { duration: 0.3, ease: 'easeOut' }
    }
}

export function EducationPage({ education }) {
    const sortedEdu = education ? [...education].sort((a, b) => b.time - a.time) : []

    return (
        <main className="main-feed">
            <motion.div
                className="feed-header"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1>Education</h1>
            </motion.div>

            <div className="edu-timeline">
                <motion.div
                    className="edu-timeline-line"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ transformOrigin: 'top' }}
                />

                {sortedEdu.map((edu, index) => {
                    const dir = index % 2 === 0 ? 'left' : 'right'
                    return (
                        <motion.div
                            className={`edu-timeline-item ${dir}`}
                            key={edu.id}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            custom={dir}
                        >
                            <motion.div
                                className="edu-timeline-dot"
                                variants={dotVariant}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            />
                            <motion.div
                                className="edu-card"
                                whileHover={{
                                    y: -3,
                                    transition: { duration: 0.2 }
                                }}
                            >
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
                                    <motion.div
                                        className="edu-badge"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3, duration: 0.3 }}
                                    >
                                        <span className="edu-badge-dot" />
                                        Currently Enrolled
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    )
                })}

                {sortedEdu.length === 0 && (
                    <div style={{ padding: '40px 20px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                        No education added yet.
                    </div>
                )}
            </div>
        </main>
    )
}
