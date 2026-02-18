import { useState, useEffect } from 'react'

const API = 'http://localhost:5000/api'

/* ─── Admin SVG Icons ──────────────────────────────── */

const ic = { width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24' }

const AdminIcon = {
    Lock: () => (
        <svg {...ic}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
    ),
    Settings: () => (
        <svg {...ic}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
    ),
    Plus: () => (
        <svg {...ic}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
    ),
    Pencil: () => (
        <svg {...ic}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
    ),
    FileText: () => (
        <svg {...ic}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
    ),
    User: () => (
        <svg {...ic}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    ),
    Check: () => (
        <svg {...ic} style={{ color: 'var(--accent)' }}><polyline points="20 6 9 17 4 12" /></svg>
    ),
    X: () => (
        <svg {...ic} style={{ color: '#f4212e' }}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
    ),
    ArrowLeft: () => (
        <svg {...ic} style={{ width: 14, height: 14 }}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
    ),
    LogOut: () => (
        <svg {...ic} style={{ width: 14, height: 14 }}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
    ),
}

/* ─── Admin Page ───────────────────────────────────── */

export default function AdminPage({ onBack }) {
    const [token, setToken] = useState(localStorage.getItem('admin_token') || '')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Check if existing token is valid
    useEffect(() => {
        if (token) {
            fetch(`${API}/data/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((r) => {
                    if (r.ok) setIsLoggedIn(true)
                    else {
                        localStorage.removeItem('admin_token')
                        setToken('')
                    }
                })
                .catch(() => {
                    localStorage.removeItem('admin_token')
                    setToken('')
                })
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            localStorage.setItem('admin_token', data.token)
            setToken(data.token)
            setIsLoggedIn(true)
        } catch (err) {
            setError(err.message)
        }
        setLoading(false)
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_token')
        setToken('')
        setIsLoggedIn(false)
    }

    if (!isLoggedIn) {
        return (
            <main className="main-feed">
                <div className="feed-header">
                    <h1><span className="admin-icon-inline"><AdminIcon.Lock /></span> Admin Login</h1>
                    <p>
                        <button className="admin-back-btn" onClick={onBack}>
                            <AdminIcon.ArrowLeft /> Back to site
                        </button>
                    </p>
                </div>
                <div className="admin-login">
                    <form onSubmit={handleLogin}>
                        <h2>Enter Admin Password</h2>
                        {error && <div className="admin-error">{error}</div>}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="admin-input"
                            autoFocus
                        />
                        <button type="submit" className="admin-btn-primary" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </main>
        )
    }

    return <AdminDashboard token={token} onLogout={handleLogout} onBack={onBack} />
}

/* ─── Admin Dashboard ──────────────────────────────── */

function AdminDashboard({ token, onLogout, onBack }) {
    const [activeTab, setActiveTab] = useState('projects')
    const [data, setData] = useState({ projects: [], blog: [], skills: {}, profile: {} })
    const [notification, setNotification] = useState(null) // { message, type }

    const tabs = ['projects', 'blog', 'skills', 'profile']

    // Notification helper
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type })
        // Auto dismiss after 3s
        setTimeout(() => {
            setNotification((prev) => (prev && prev.message === message ? null : prev))
        }, 3000)
    }

    const fetchAll = async () => {
        try {
            const results = {}
            for (const type of tabs) {
                const res = await fetch(`${API}/data/${type}`)
                results[type] = await res.json()
            }
            setData(results)
        } catch (err) {
            showNotification('Error loading data', 'error')
        }
    }

    useEffect(() => {
        fetchAll()
    }, [])

    const authHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    const addItem = async (type, item) => {
        try {
            const res = await fetch(`${API}/data/${type}`, {
                method: 'POST',
                headers: authHeaders,
                body: JSON.stringify(item),
            })
            if (!res.ok) throw new Error('Failed to add')
            showNotification('Added successfully!', 'success')
            fetchAll()
        } catch (err) {
            showNotification(err.message, 'error')
        }
    }

    const updateItem = async (type, id, item) => {
        try {
            const url = id ? `${API}/data/${type}/${id}` : `${API}/data/${type}/${type}`
            const res = await fetch(url, {
                method: 'PUT',
                headers: authHeaders,
                body: JSON.stringify(item),
            })
            if (!res.ok) throw new Error('Failed to update')
            showNotification('Updated successfully!', 'success')
            fetchAll()
        } catch (err) {
            showNotification(err.message, 'error')
        }
    }

    const deleteItem = async (type, id) => {
        if (!confirm('Are you sure you want to delete this item?')) return
        try {
            const res = await fetch(`${API}/data/${type}/${id}`, {
                method: 'DELETE',
                headers: authHeaders,
            })
            if (!res.ok) throw new Error('Failed to delete')
            showNotification('Deleted successfully!', 'success')
            fetchAll()
        } catch (err) {
            showNotification(err.message, 'error')
        }
    }

    return (
        <main className="main-feed relative">
            <div className="feed-header">
                <h1><span className="admin-icon-inline"><AdminIcon.Settings /></span> Admin Dashboard</h1>
                <p>
                    <button className="admin-back-btn" onClick={onBack}><AdminIcon.ArrowLeft /> Back</button>
                    {' · '}
                    <button className="admin-back-btn" onClick={onLogout}><AdminIcon.LogOut /> Logout</button>
                </p>
            </div>

            {/* Notification Toast */}
            {notification && (
                <div className={`admin-toast ${notification.type}`}>
                    {notification.type === 'success' ? <AdminIcon.Check /> : <AdminIcon.X />}
                    {notification.message}
                </div>
            )}

            <div className="feed-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`feed-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => { setActiveTab(tab) }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {activeTab === 'projects' && (
                <ProjectsEditor
                    projects={data.projects}
                    onAdd={(item) => addItem('projects', item)}
                    onUpdate={(id, item) => updateItem('projects', id, item)}
                    onDelete={(id) => deleteItem('projects', id)}
                />
            )}
            {activeTab === 'blog' && (
                <BlogEditor
                    posts={data.blog}
                    onAdd={(item) => addItem('blog', item)}
                    onUpdate={(id, item) => updateItem('blog', id, item)}
                    onDelete={(id) => deleteItem('blog', id)}
                />
            )}
            {activeTab === 'skills' && (
                <SkillsEditor
                    skills={data.skills}
                    onUpdate={(item) => updateItem('skills', 'skills', item)}
                />
            )}
            {activeTab === 'profile' && (
                <ProfileEditor
                    profile={data.profile}
                    onUpdate={(item) => updateItem('profile', 'profile', item)}
                />
            )}
        </main>
    )
}

/* ─── Projects Editor ──────────────────────────────── */

function ProjectsEditor({ projects, onAdd, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ title: '', desc: '', text: '', tags: '' })

    const resetForm = () => {
        setForm({ title: '', desc: '', text: '', tags: '' })
        setEditing(null)
    }

    const startEdit = (proj) => {
        setForm({
            title: proj.title,
            desc: proj.desc,
            text: proj.text,
            tags: proj.tags.join(', '),
        })
        setEditing(proj.id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const item = {
            ...form,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        }
        if (editing) {
            onUpdate(editing, item)
        } else {
            onAdd(item)
        }
        resetForm()
    }

    return (
        <div className="admin-section">
            <form className="admin-form" onSubmit={handleSubmit}>
                <h3>{editing ? <><span className="admin-icon-inline"><AdminIcon.Pencil /></span> Edit Project</> : <><span className="admin-icon-inline"><AdminIcon.Plus /></span> Add Project</>}</h3>
                <input className="admin-input" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                <textarea className="admin-textarea no-resize" placeholder="Description" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} required />
                <textarea className="admin-textarea no-resize" placeholder="Tweet text" value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} required />
                <input className="admin-input" placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
                <div className="admin-form-actions">
                    <button type="submit" className="admin-btn-primary">{editing ? 'Update' : 'Add'}</button>
                    {editing && <button type="button" className="admin-btn-secondary" onClick={resetForm}>Cancel</button>}
                </div>
            </form>

            <div className="admin-list">
                {projects.map((proj) => (
                    <div className="admin-list-item" key={proj.id}>
                        <div className="admin-list-info">
                            <strong>{proj.title}</strong>
                            <p>{proj.desc}</p>
                            <div className="admin-tags">
                                {proj.tags.map(t => <span key={t} className="admin-tag">{t}</span>)}
                            </div>
                            <span className="admin-time" style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                                {new Date(proj.time).toLocaleString()}
                            </span>
                        </div>
                        <div className="admin-list-actions">
                            <button className="admin-btn-edit" onClick={() => startEdit(proj)}>Edit</button>
                            <button className="admin-btn-delete" onClick={() => onDelete(proj.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Blog Editor ──────────────────────────────────── */

function BlogEditor({ posts, onAdd, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ title: '', text: '' })

    const resetForm = () => {
        setForm({ title: '', text: '' })
        setEditing(null)
    }

    const startEdit = (post) => {
        setForm({ title: post.title, text: post.text })
        setEditing(post.id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const item = { ...form }
        if (editing) {
            onUpdate(editing, item)
        } else {
            onAdd(item)
        }
        resetForm()
    }

    return (
        <div className="admin-section">
            <form className="admin-form" onSubmit={handleSubmit}>
                <h3>{editing ? <><span className="admin-icon-inline"><AdminIcon.Pencil /></span> Edit Post</> : <><span className="admin-icon-inline"><AdminIcon.Plus /></span> Add Post</>}</h3>
                <input className="admin-input" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                <textarea className="admin-textarea no-resize" placeholder="Content" value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} required rows={6} />
                <div className="admin-form-actions">
                    <button type="submit" className="admin-btn-primary">{editing ? 'Update' : 'Add'}</button>
                    {editing && <button type="button" className="admin-btn-secondary" onClick={resetForm}>Cancel</button>}
                </div>
            </form>

            <div className="admin-list">
                {posts.map((post) => (
                    <div className="admin-list-item" key={post.id}>
                        <div className="admin-list-info">
                            <strong>{post.title}</strong>
                            <p>{post.text.slice(0, 100)}...</p>
                            <span className="admin-time" style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                                {new Date(post.time).toLocaleString()}
                            </span>
                        </div>
                        <div className="admin-list-actions">
                            <button className="admin-btn-edit" onClick={() => startEdit(post)}>Edit</button>
                            <button className="admin-btn-delete" onClick={() => onDelete(post.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Skills Editor ────────────────────────────────── */

function SkillsEditor({ skills, onUpdate }) {
    const [categories, setCategories] = useState([])
    const [techStack, setTechStack] = useState('')

    useEffect(() => {
        if (skills?.categories) setCategories(skills.categories)
        if (skills?.techStack) setTechStack(skills.techStack.join(', '))
    }, [skills])

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdate({
            categories,
            techStack: techStack.split(',').map(t => t.trim()).filter(Boolean),
        })
    }

    const updateCategory = (i, field, value) => {
        const updated = [...categories]
        if (field === 'tags') {
            updated[i] = { ...updated[i], tags: value.split(',').map(t => t.trim()).filter(Boolean) }
        } else {
            updated[i] = { ...updated[i], [field]: value }
        }
        setCategories(updated)
    }

    const addCategory = () => {
        setCategories([...categories, { label: '', tags: [] }])
    }

    const removeCategory = (i) => {
        setCategories(categories.filter((_, idx) => idx !== i))
    }

    return (
        <div className="admin-section">
            <form className="admin-form" onSubmit={handleSubmit}>
                <h3><span className="admin-icon-inline"><AdminIcon.FileText /></span> Edit Skills</h3>

                {categories.map((cat, i) => (
                    <div className="admin-skill-category" key={i}>
                        <div className="admin-skill-row">
                            <input className="admin-input" placeholder="Category name" value={cat.label} onChange={e => updateCategory(i, 'label', e.target.value)} />
                            <button type="button" className="admin-btn-delete" onClick={() => removeCategory(i)}><AdminIcon.X /></button>
                        </div>
                        <input className="admin-input" placeholder="Tags (comma separated)" value={cat.tags.join(', ')} onChange={e => updateCategory(i, 'tags', e.target.value)} />
                    </div>
                ))}

                <button type="button" className="admin-btn-secondary" onClick={addCategory}><AdminIcon.Plus /> Add Category</button>

                <h3 style={{ marginTop: 16 }}>All Technologies</h3>
                <textarea className="admin-textarea no-resize" placeholder="All tech (comma separated)" value={techStack} onChange={e => setTechStack(e.target.value)} rows={3} />

                <div className="admin-form-actions">
                    <button type="submit" className="admin-btn-primary">Save Skills</button>
                </div>
            </form>
        </div>
    )
}

/* ─── Profile Editor ───────────────────────────────── */

function ProfileEditor({ profile, onUpdate }) {
    const [form, setForm] = useState({})

    useEffect(() => {
        if (profile) setForm(profile)
    }, [profile])

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdate(form)
    }

    const fields = [
        { key: 'name', label: 'Name' },
        { key: 'handle', label: 'Handle' },
        { key: 'location', label: 'Location' },
        { key: 'education', label: 'Education' },
        { key: 'email', label: 'Email' },
        { key: 'website', label: 'Website' },
        { key: 'joined', label: 'Joined' },
        { key: 'following', label: 'Following', type: 'number' },
        { key: 'followers', label: 'Followers' }, // Changed to text to handle both "1,247" string and numbers if needed, but keeping simple
    ]

    return (
        <div className="admin-section">
            <form className="admin-form" onSubmit={handleSubmit}>
                <h3><span className="admin-icon-inline"><AdminIcon.User /></span> Edit Profile</h3>

                {fields.map(({ key, label, type }) => (
                    <div className="admin-field" key={key}>
                        <label>{label}</label>
                        <input
                            className={`admin-input ${type === 'number' ? 'no-spinner' : ''}`}
                            type={type || 'text'}
                            value={form[key] ?? ''} // nullish coalescing allows 0 to be shown
                            onChange={e => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
                        />
                    </div>
                ))}

                <div className="admin-field">
                    <label>Bio</label>
                    <textarea className="admin-textarea no-resize" value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3} />
                </div>

                <div className="admin-form-actions">
                    <button type="submit" className="admin-btn-primary">Save Profile</button>
                </div>
            </form>
        </div>
    )
}
