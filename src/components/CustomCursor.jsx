import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const [expanded, setExpanded] = useState(false)
    const pos = useRef({ x: 0, y: 0 })
    const ring = useRef({ x: 0, y: 0 })
    const raf = useRef(null)

    useEffect(() => {
        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY }
            if (dotRef.current) {
                dotRef.current.style.left = e.clientX + 'px'
                dotRef.current.style.top = e.clientY + 'px'
            }
        }

        const lerp = (a, b, t) => a + (b - a) * t
        const loop = () => {
            ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
            ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)
            if (ringRef.current) {
                ringRef.current.style.left = ring.current.x + 'px'
                ringRef.current.style.top = ring.current.y + 'px'
            }
            raf.current = requestAnimationFrame(loop)
        }

        const onEnter = (e) => {
            if (e.target.closest('a, button, [data-cursor-expand]')) setExpanded(true)
        }
        const onLeave = (e) => {
            if (e.target.closest('a, button, [data-cursor-expand]')) setExpanded(false)
        }

        window.addEventListener('mousemove', onMove)
        document.addEventListener('mouseover', onEnter)
        document.addEventListener('mouseout', onLeave)
        raf.current = requestAnimationFrame(loop)

        return () => {
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onEnter)
            document.removeEventListener('mouseout', onLeave)
            cancelAnimationFrame(raf.current)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className={`cursor-ring ${expanded ? 'expanded' : ''}`} />
        </>
    )
}

export default CustomCursor
