import React, { useState, useEffect } from 'react'

export function TimeAgo({ timestamp }) {
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
