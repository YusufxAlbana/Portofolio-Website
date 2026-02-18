import React from 'react'
import { Icon } from '../components/Icon'
import { TimeAgo } from '../components/TimeAgo'

export function BlogPage({ profile, blog }) {
    if (!blog) return <div className="loading">Loading blog...</div>

    return (
        <main className="main-feed">


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
