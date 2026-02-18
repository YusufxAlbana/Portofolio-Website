import { useState, useEffect } from 'react'
import AdminPage from './AdminPage'
import './index.css'

const API = 'http://localhost:5000/api'

/* ─── SVG Icons ────────────────────────────────────── */

const s = { width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

const Icon = {
  User: () => (
    <svg {...s} viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  Layers: () => (
    <svg {...s} viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
  ),
  Zap: () => (
    <svg {...s} viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
  Edit: () => (
    <svg {...s} viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
  ),
  Search: () => (
    <svg {...s} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  ),
  MapPin: () => (
    <svg {...s} viewBox="0 0 24 24" width={16} height={16}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  Link: () => (
    <svg {...s} viewBox="0 0 24 24" width={16} height={16}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
  ),
  GraduationCap: () => (
    <svg {...s} viewBox="0 0 24 24" width={16} height={16}><path d="M22 10l-10-5L2 10l10 5 10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
  ),
  Calendar: () => (
    <svg {...s} viewBox="0 0 24 24" width={16} height={16}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
  ),
  Comment: () => (
    <svg {...s} viewBox="0 0 24 24" width={18} height={18}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
  ),
  Repost: () => (
    <svg {...s} viewBox="0 0 24 24" width={18} height={18}><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>
  ),
  Heart: () => (
    <svg {...s} viewBox="0 0 24 24" width={18} height={18}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
  ),
  BarChart: () => (
    <svg {...s} viewBox="0 0 24 24" width={18} height={18}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
  ),
  ExternalLink: () => (
    <svg {...s} viewBox="0 0 24 24" width={16} height={16}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
  ),
  Home: () => (
    <svg {...s} viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  ),
  Bell: () => (
    <svg {...s} viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
  ),
  Mail: () => (
    <svg {...s} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
  ),
  Palette: () => (
    <svg {...s} viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r="1.5" /><circle cx="17.5" cy="10.5" r="1.5" /><circle cx="8.5" cy="7.5" r="1.5" /><circle cx="6.5" cy="12" r="1.5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.04-.23-.29-.38-.63-.38-1.01 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.52-4.48-9.96-10-9.96z" /></svg>
  ),
  Wrench: () => (
    <svg {...s} viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>
  ),
  Pin: () => (
    <svg {...s} viewBox="0 0 24 24" width={14} height={14}><path d="M12 17l-5 3 1.5-5.6L4 10.5l5.8-.5L12 5l2.2 5 5.8.5-4.5 3.9L17 20z" /></svg>
  ),
  GitHub: () => (
    <svg {...s} viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
  ),
  LinkedIn: () => (
    <svg {...s} viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
  ),
  MailIcon: () => (
    <svg {...s} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
  ),
  Phone: () => (
    <svg {...s} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
  ),
}

/* ─── Utils ────────────────────────────────────────── */

function TimeAgo({ timestamp }) {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const update = () => {
      if (!timestamp) return
      const now = Date.now()
      const time = new Date(timestamp).getTime()
      const diff = now - time

      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      const weeks = Math.floor(days / 7)

      if (seconds < 60) setTimeAgo('Just now')
      else if (minutes < 60) setTimeAgo(`${minutes}m ago`)
      else if (hours < 24) setTimeAgo(`${hours}h ago`)
      else if (days < 7) setTimeAgo(`${days}d ago`)
      else setTimeAgo(`${weeks}w ago`)
    }

    update()
    const interval = setInterval(update, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [timestamp])

  return <span>{timeAgo}</span>
}

/* ─── Sidebar Left (Navigation) ────────────────────── */

function SidebarLeft({ activePage, setActivePage, profile }) {
  const sections = [
    { id: 'profile', icon: <Icon.User />, label: 'Profile' },
    { id: 'projects', icon: <Icon.Layers />, label: 'Projects' },
    { id: 'skills', icon: <Icon.Zap />, label: 'Skills' },
    { id: 'blog', icon: <Icon.Edit />, label: 'Blog' },
  ]

  return (
    <aside className="sidebar-left">
      <a href="#" className="sidebar-logo" onClick={(e) => { e.preventDefault(); setActivePage('profile') }}>
        <img src="/assets/images/logo YNA.svg" alt="YNA" />
      </a>

      <nav className="sidebar-nav">
        {sections.map((item) => (
          <button
            key={item.id}
            className={`sidebar-nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-status">
        <span className="status-dot" />
        <span>Available for hire</span>
      </div>

      <a href={`https://wa.me/6285168845761`} className="sidebar-cta">Hubungi Saya</a>

      <div className="sidebar-profile">
        <div className="sidebar-avatar"><img src={profile.photo} alt="Profile" /></div>
        <div className="sidebar-profile-info">
          <div className="sidebar-profile-name">{profile.name}</div>
          <div className="sidebar-profile-handle">{profile.handle}</div>
        </div>
      </div>
    </aside>
  )
}

/* ─── Page: Profile ────────────────────────────────── */

function ProfilePage({ profile, skills }) {
  if (!profile) return <div className="loading">Loading profile...</div>

  const skillCategories = skills?.categories || []

  return (
    <main className="main-feed">
      <div className="feed-header">
        <h1>{profile.name}</h1>
        <p>Profile</p>
      </div>

      <div className="profile-banner">
        <img src={profile.banner} alt="Banner" />
      </div>
      <div className="profile-info">
        <div className="profile-avatar-large"><img src={profile.photo} alt={profile.name} /></div>
        <div className="profile-actions">
          <a href={`https://wa.me/6285168845761`} className="btn-outline">Hubungi</a>
        </div>

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

      {/* Pinned intro post */}
      <div className="pinned-label">
        <span className="pin-icon"><Icon.Pin /></span> Pinned
      </div>
      <article className="post-card">
        <div className="post-avatar"><img src={profile.photo} alt="Profile" /></div>
        <div className="post-content">
          <div className="post-header">
            <span className="post-name">{profile.name}</span>
            <span className="post-handle">{profile.handle}</span>
          </div>
          <div className="post-text" style={{ whiteSpace: 'pre-line' }}>
            Halo! Saya seorang <span className="highlight">Fullstack Developer</span> yang
            passionate membangun pengalaman digital modern. Open to work &amp; collaboration!{'\n\n'}
            {profile.location}{'\n'}
            {profile.education}{'\n'}
            Freelancer &amp; Open Source Contributor
          </div>
          <div className="skill-grid-inline">
            {skillCategories.slice(0, 4).map((skill) => (
              <div className="skill-item-inline" key={skill.label}>
                <div className="skill-icon">💡</div>
                <h4>{skill.label}</h4>
                <div className="mini-tags">
                  {skill.tags.slice(0, 4).map((tag) => (
                    <span className="mini-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}

/* ─── Page: Projects ───────────────────────────────── */

function ProjectsPage({ profile, projects }) {
  if (!projects) return <div className="loading">Loading projects...</div>

  return (
    <main className="main-feed">
      <div className="feed-header">
        <h1>Projects</h1>
        <p>{projects.length} projects</p>
      </div>

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

/* ─── Page: Skills ─────────────────────────────────── */

function SkillsPage({ skills }) {
  if (!skills) return <div className="loading">Loading skills...</div>

  const categories = skills.categories || []
  const techStack = skills.techStack || []

  return (
    <main className="main-feed">
      <div className="feed-header">
        <h1>Skills</h1>
        <p>Tech stack & expertise</p>
      </div>

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

/* ─── Page: Blog ───────────────────────────────────── */

function BlogPage({ profile, blog }) {
  if (!blog) return <div className="loading">Loading blog...</div>

  return (
    <main className="main-feed">
      <div className="feed-header">
        <h1>Blog</h1>
        <p>{blog.length} posts</p>
      </div>

      {blog.length === 0 ? (
        <div className="empty-state">No blog posts yet.</div>
      ) : (
        blog.map((post) => (
          <article className="post-card" key={post.id}>
            <div className="post-avatar"><img src={profile.photo} alt="Profile" /></div>
            <div className="post-content">
              <div className="post-header">
                <span className="post-name">{profile.name}</span>
                <span className="post-handle">{profile.handle}</span>
                <span className="post-dot">·</span>
                <span className="post-time"><TimeAgo timestamp={post.time} /></span>
              </div>
              <div className="post-blog-title">{post.title}</div>
              <div className="post-text" style={{ whiteSpace: 'pre-line' }}>{post.text}</div>
            </div>
          </article>
        ))
      )}
    </main>
  )
}

/* ─── Sidebar Right ────────────────────────────────── */

function SidebarRight({ techStack, profile }) {
  const techs = techStack || []

  const CONNECT_LINKS = [
    { icon: <Icon.GitHub />, name: 'GitHub', url: 'https://github.com/YusufxAlbana' },
    { icon: <Icon.LinkedIn />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/yusuf-nawaf-albana-1b493931b/' },
    { icon: <Icon.MailIcon />, name: 'Email', url: `mailto:${profile?.email}` },
    { icon: <Icon.Phone />, name: 'WhatsApp', url: 'https://wa.me/6285168845761' },
  ]

  return (
    <aside className="sidebar-right">
      {/* Tech Stack */}
      <div className="info-box">
        <div className="info-box-header">Tech Stack</div>
        <div className="tech-scroll">
          {techs.length > 0 ? (
            techs.map((tech, i) => (
              <span className="tech-chip" key={i}>{tech}</span>
            ))
          ) : (
            <span className="empty-tech">Loading...</span>
          )}
        </div>
      </div>

      {/* Connect with me */}
      <div className="info-box">
        <div className="info-box-header">Connect with me</div>
        {CONNECT_LINKS.map((link, i) => (
          <a href={link.url} className="connect-item" key={i} target="_blank" rel="noopener noreferrer">
            <div className="connect-icon">{link.icon}</div>
            <div className="follow-name">{link.name}</div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <a href={`https://${profile?.website}`} target="_blank" rel="noopener noreferrer">© 2026 {profile?.website}</a>
      </div>
    </aside>
  )
}

/* ─── Mobile Nav ───────────────────────────────────── */

function MobileNav({ activePage, setActivePage }) {
  return (
    <nav className="mobile-nav">
      <button className={`mobile-nav-item ${activePage === 'profile' ? 'active' : ''}`} onClick={() => setActivePage('profile')}><Icon.User /></button>
      <button className={`mobile-nav-item ${activePage === 'projects' ? 'active' : ''}`} onClick={() => setActivePage('projects')}><Icon.Layers /></button>
      <button className={`mobile-nav-item ${activePage === 'skills' ? 'active' : ''}`} onClick={() => setActivePage('skills')}><Icon.Zap /></button>
      <button className={`mobile-nav-item ${activePage === 'blog' ? 'active' : ''}`} onClick={() => setActivePage('blog')}><Icon.Edit /></button>
    </nav>
  )
}

/* ─── App ──────────────────────────────────────────── */

function App() {
  const [activePage, setActivePage] = useState('profile')
  const [apiData, setApiData] = useState({
    profile: null,
    projects: [],
    blog: [],
    skills: { categories: [], techStack: [] }
  })
  const [loading, setLoading] = useState(true)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, blogRes, skillsRes] = await Promise.all([
          fetch(`${API}/data/profile`),
          fetch(`${API}/data/projects`),
          fetch(`${API}/data/blog`),
          fetch(`${API}/data/skills`),
        ])

        if (!profileRes.ok || !projectsRes.ok || !blogRes.ok || !skillsRes.ok) throw new Error('API Error')

        const [profile, projects, blog, skills] = await Promise.all([
          profileRes.json(),
          projectsRes.json(),
          blogRes.json(),
          skillsRes.json(),
        ])
        setApiData({ profile, projects, blog, skills })
      } catch (err) {
        console.error('Failed to fetch data, make sure server is running.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Ctrl+Shift+A to toggle admin page
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        setActivePage(prev => prev === 'admin' ? 'profile' : 'admin')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (activePage === 'admin') {
    return (
      <div className="app-layout">
        {/* Pass initial data or refetch in AdminPage, usually separate */}
        <SidebarLeft activePage={activePage} setActivePage={setActivePage} profile={apiData.profile || {}} />
        <AdminPage onBack={() => setActivePage('profile')} />
        <SidebarRight techStack={apiData.skills?.techStack} profile={apiData.profile} />
        <MobileNav activePage={activePage} setActivePage={setActivePage} />
      </div>
    )
  }

  if (loading && !apiData.profile) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Portfolio...</p>
      </div>
    )
  }

  // Safe Fallback if API fails completely to avoid crash, but prefer showing empty state
  const profile = apiData.profile || {}
  const projects = apiData.projects || []
  const blog = apiData.blog || []
  const skills = apiData.skills || { categories: [], techStack: [] }

  const pages = {
    profile: <ProfilePage profile={profile} skills={skills} />,
    projects: <ProjectsPage profile={profile} projects={projects} />,
    skills: <SkillsPage skills={skills} />,
    blog: <BlogPage profile={profile} blog={blog} />,
  }

  return (
    <div className="app-layout">
      <SidebarLeft activePage={activePage} setActivePage={setActivePage} profile={profile} />
      {pages[activePage]}
      <SidebarRight techStack={skills.techStack} profile={profile} />
      <MobileNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  )
}

export default App
