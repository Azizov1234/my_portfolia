import { useEffect, useState } from 'react'

const ScrollProgress = () => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            setWidth(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div
            className="scroll-progress"
            style={{ width: `${width}%` }}
            role="progressbar"
            aria-valuenow={Math.round(width)}
            aria-label="Page scroll progress"
        />
    )
}

export default ScrollProgress
