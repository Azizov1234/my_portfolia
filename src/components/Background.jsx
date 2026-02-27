import { useEffect, useRef } from 'react'

/* Three.js particle field -- lazy loaded via dynamic import */
const ParticleCanvas = () => {
    const canvasRef = useRef(null)
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let W = canvas.width = window.innerWidth
        let H = canvas.height = window.innerHeight
        let particles = []
        let animId

        const COLORS = ['#a855f7', '#06b6d4', '#6366f1', '#818cf8', '#38bdf8']

        const rand = (min, max) => Math.random() * (max - min) + min

        class Particle {
            constructor() { this.reset(true) }
            reset(init = false) {
                this.x = rand(0, W)
                this.y = init ? rand(0, H) : H + 10
                this.z = rand(0.2, 1)           // depth
                this.vx = rand(-0.15, 0.15) * this.z
                this.vy = rand(-0.4, -0.1) * this.z
                this.r = rand(0.6, 2.2) * this.z
                this.a = rand(0.2, 0.8)
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
                this.life = 0
                this.maxLife = rand(200, 500)
            }
            update() {
                const dx = mouse.current.x - this.x
                const dy = mouse.current.y - this.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 150) {
                    this.x -= (dx / dist) * 0.3
                    this.y -= (dy / dist) * 0.3
                }
                this.x += this.vx
                this.y += this.vy
                this.life++
                if (this.life > this.maxLife || this.y < -10) this.reset()
            }
            draw() {
                const alpha = this.a * Math.min(1, Math.min(this.life, this.maxLife - this.life) / 50)
                ctx.save()
                ctx.globalAlpha = alpha
                ctx.fillStyle = this.color
                ctx.shadowColor = this.color
                ctx.shadowBlur = 6 * this.z
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            }
        }

        // Init particles
        const COUNT = Math.min(120, Math.floor((W * H) / 12000))
        for (let i = 0; i < COUNT; i++) particles.push(new Particle())

        // Connecting lines
        const drawLines = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 90) {
                        ctx.save()
                        ctx.globalAlpha = (1 - dist / 90) * 0.08
                        ctx.strokeStyle = '#a855f7'
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                        ctx.restore()
                    }
                }
            }
        }

        const loop = () => {
            ctx.clearRect(0, 0, W, H)
            drawLines()
            particles.forEach(p => { p.update(); p.draw() })
            animId = requestAnimationFrame(loop)
        }

        loop()

        const onResize = () => {
            W = canvas.width = window.innerWidth
            H = canvas.height = window.innerHeight
        }
        const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }

        window.addEventListener('resize', onResize)
        window.addEventListener('mousemove', onMouse)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('mousemove', onMouse)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    )
}

const Background = () => {
    const mouseGlow = useRef(null)

    useEffect(() => {
        const onMove = (e) => {
            if (!mouseGlow.current) return
            mouseGlow.current.style.left = e.clientX + 'px'
            mouseGlow.current.style.top = e.clientY + 'px'
        }
        window.addEventListener('mousemove', onMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-[var(--c-bg)]" />

            {/* Mesh gradient blobs */}
            <div className="blob-1 absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-purple-950/30 blur-[140px]" />
            <div className="blob-2 absolute top-1/3 -right-60 w-[600px] h-[600px] rounded-full bg-cyan-950/25 blur-[120px]" />
            <div className="blob-3 absolute -bottom-40 left-1/3 w-[800px] h-[500px] rounded-full bg-indigo-950/25 blur-[140px]" />

            {/* Particle canvas */}
            <ParticleCanvas />

            {/* Mouse reactive glow orb */}
            <div
                ref={mouseGlow}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none transition-[left,top] duration-200 ease-out"
                style={{
                    background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
                    left: '50%',
                    top: '50%',
                }}
            />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,8,0.7) 100%)',
                }}
            />
        </div>
    )
}

export default Background
