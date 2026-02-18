import React, { useState } from 'react'
import { Icon } from '../components/Icon'

export function ProfilePage({ profile, skills, experience, education }) {
    if (!profile) return <div className="loading">Loading profile...</div>

    const skillCategories = skills?.categories || []
    const sortedExp = experience ? [...experience].sort((a, b) => b.id - a.id) : []
    const sortedEdu = education ? [...education].sort((a, b) => b.id - a.id) : []

    return (
        <main className="main-feed">


            <div className="profile-banner">
                <img src={profile.banner} alt="Banner" />
            </div>
            <div className="profile-info">
                <div className="profile-avatar-large"><img src={profile.photo} alt={profile.name} /></div>


                <div className="profile-name-block">
                    <h2 className="profile-display-name">{profile.name}</h2>
                    <p className="profile-handle">{profile.handle}</p>
                </div>

                <p className="profile-bio">{profile.bio}</p>

                <div className="profile-meta">
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
                        <span className="meta-icon"><Icon.Calendar /></span> Joined {profile.joined}
                    </span>
                </div>

                <div className="profile-stats">
                    <span><strong>{profile.following}</strong> Following</span>
                    <span><strong>{profile.followers}</strong> Followers</span>
                </div>
            </div>

            {/* Experience Section */}
            <div className="pinned-label">
                <span className="pin-icon"><Icon.Briefcase /></span> Experience
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

            {/* Education Section */}
            <div className="pinned-label">
                <span className="pin-icon"><Icon.GraduationCap /></span> Education
            </div>
            {sortedEdu.map((edu) => (
                <article className="post-card" key={edu.id}>
                    <div className="post-content" style={{ width: '100%' }}>
                        <div className="post-header">
                            <span className="post-name">{edu.school}</span>
                            <span className="post-dot">·</span>
                            <span className="post-time">{edu.duration}</span>
                        </div>
                        <div className="post-text">{edu.degree}</div>
                        {edu.desc && <div className="post-text" style={{ marginTop: 4, color: '#8899a6', fontSize: '14px' }}>{edu.desc}</div>}
                    </div>
                </article>
            ))}

            {/* Pinned Contact Form */}
            <div className="pinned-label">
                <span className="pin-icon"><Icon.Mail /></span> Contact Me
            </div>
            <article className="post-card">
                <div className="post-content" style={{ width: '100%' }}>
                    <div className="post-header">
                        <span className="post-name">Mari Bekerja Sama</span>
                    </div>
                    <ContactForm />
                </div>
            </article>
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
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="admin-input"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Your Email"
                    className="admin-input"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    placeholder="Write your message..."
                    className="admin-textarea"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    rows={8}
                    style={{ resize: 'none' }}
                />
            </div>
            <button type="submit" className="admin-btn-primary" style={{ alignSelf: 'flex-start' }}>
                Kirim ke WhatsApp
            </button>
        </form>
    )
}
