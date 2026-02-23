import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '../components/Icon'

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    })
}

export function ProfilePage({ profile, skills, experience, education }) {
    if (!profile) return <div className="loading">Loading profile...</div>

    const skillCategories = skills?.categories || []
    const sortedExp = experience ? [...experience].sort((a, b) => b.id - a.id) : []
    const sortedEdu = education ? [...education].sort((a, b) => b.id - a.id) : []

    return (
        <main className="main-feed">
            <motion.div
                className="profile-banner"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                <img src={profile.banner} alt="Banner" />
            </motion.div>

            <motion.div
                className="profile-info"
                initial="hidden"
                animate="visible"
            >
                <motion.div className="profile-avatar-large" variants={fadeUp} custom={0}>
                    <img src={profile.photo} alt={profile.name} />
                </motion.div>

                <motion.div className="profile-name-block" variants={fadeUp} custom={1}>
                    <h2 className="profile-display-name">{profile.name}</h2>
                    <p className="profile-handle">{profile.handle}</p>
                </motion.div>

                <motion.p className="profile-bio" variants={fadeUp} custom={2}>
                    {profile.bio}
                </motion.p>

                <motion.div className="profile-meta" variants={fadeUp} custom={3}>
                    <span className="profile-meta-item">
                        <span className="meta-icon"><Icon.MapPin /></span> {profile.location}
                    </span>
                    <span className="profile-meta-item">
                        <span className="meta-icon"><Icon.Link /></span>
                        <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer">{profile.website}</a>
                    </span>
                    <span className="profile-meta-item">
                        <span className="meta-icon"><Icon.GraduationCap /></span> {profile.education}
                    </span>
                    <span className="profile-meta-item">
                        <span className="meta-icon"><Icon.Calendar /></span> Born {profile.birthday}
                    </span>
                </motion.div>

                <motion.div className="profile-stats" variants={fadeUp} custom={4}>
                    <span><strong>{profile.following}</strong> Following</span>
                    <span><strong>{profile.followers}</strong> Followers</span>
                </motion.div>
            </motion.div>

            {/* Pinned Contact Form */}
            <motion.div
                className="pinned-label"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <span className="pin-icon"><Icon.Mail /></span> Contact Me
            </motion.div>
            <motion.article
                className="post-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <div className="post-content" style={{ width: '100%' }}>
                    <div className="post-header">
                        <span className="post-name">Mari Bekerja Sama</span>
                    </div>
                    <ContactForm />
                </div>
            </motion.article>
        </main>
    )
}

function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    const handleSubmit = (e) => {
        e.preventDefault()

        const text = `Halo, saya ${form.name} (${form.email}).\n\n${form.message}`
        const encodedText = encodeURIComponent(text)
        const waUrl = `https://wa.me/6285168845761?text=${encodedText}`

        window.open(waUrl, '_blank')
        setForm({ name: '', email: '', message: '' })
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
            <motion.div className="form-group" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <input
                    type="text"
                    placeholder="Your Name"
                    className="admin-input"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                />
            </motion.div>
            <motion.div className="form-group" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <input
                    type="email"
                    placeholder="Your Email"
                    className="admin-input"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                />
            </motion.div>
            <motion.div className="form-group" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                <textarea
                    placeholder="Write your message..."
                    className="admin-textarea"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    rows={8}
                    style={{ resize: 'none' }}
                />
            </motion.div>
            <motion.button
                type="submit"
                className="admin-btn-primary"
                style={{ alignSelf: 'flex-start' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
            >
                Kirim ke WhatsApp
            </motion.button>
        </form>
    )
}
