import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'

const ROLES = [
    'Backend Engineer',
    'Node.js / NestJS Dev',
    'PostgreSQL Architect',
    'System Design Thinker',
    'REST API Specialist',
]

const KEYWORDS = [
    { text: 'Scalable', x: '8%', y: '25%', size: 'text-sm', delay: 0.8 },
    { text: 'Secure', x: '80%', y: '20%', size: 'text-sm', delay: 1.1 },
    { text: 'NestJS', x: '5%', y: '65%', size: 'text-sm', delay: 0.6 },
    { text: 'REST', x: '85%', y: '60%', size: 'text-sm', delay: 1.3 },
    { text: 'Docker', x: '12%', y: '80%', size: 'text-[10px]', delay: 0.9 },
    { text: 'Prisma', x: '78%', y: '78%', size: 'text-[10px]', delay: 1.0 },
    { text: 'JWT', x: '45%', y: '88%', size: 'text-[10px]', delay: 1.4 },
    { text: 'Redis', x: '90%', y: '40%', size: 'text-[10px]', delay: 0.7 },
]

const TypeWriter = ({ texts }) => {
    const [displayed, setDisplayed] = useState('')
    const [roleIdx, setRoleIdx] = useState(0)
    const [charIdx, setCharIdx] = useState(0)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const cur = texts[roleIdx]
        let t
        if (!deleting && charIdx < cur.length) {
            t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx + 1)); setCharIdx(c => c + 1) }, 55)
        } else if (!deleting && charIdx === cur.length) {
            t = setTimeout(() => setDeleting(true), 2200)
        } else if (deleting && charIdx > 0) {
            t = setTimeout(() => { setDisplayed(cur.slice(0, charIdx - 1)); setCharIdx(c => c - 1) }, 30)
        } else {
            setDeleting(false); setRoleIdx(r => (r + 1) % texts.length)
        }
        return () => clearTimeout(t)
    }, [charIdx, deleting, roleIdx, texts])

    return (
        <span className="gradient-text font-semibold">
            {displayed}
            <span className="inline-block w-0.5 h-5 bg-purple-400 ml-0.5 animate-pulse align-middle" />
        </span>
    )
}

const Hero = ({ lang }) => {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section id="home" className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden">

            {/* Radial glow behind text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="w-[700px] h-[700px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(6,182,212,0.04) 50%, transparent 70%)',
                        animation: 'pulseGlow 4s ease-in-out infinite',
                    }}
                />
            </div>

            {/* Floating keywords */}
            {KEYWORDS.map((kw) => (
                <motion.span
                    key={kw.text}
                    className={`absolute font-mono font-semibold text-purple-500/20 pointer-events-none select-none ${kw.size}`}
                    style={{ left: kw.x, top: kw.y }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0.2, 0.4] }}
                    transition={{ duration: 4, delay: kw.delay, repeat: Infinity, repeatType: 'reverse' }}
                >
                    {kw.text}
                </motion.span>
            ))}

            {/* Status badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full glass-light text-sm sm:text-base font-mono font-bold text-emerald-400 mb-10 tracking-widest whitespace-nowrap shadow-lg shadow-emerald-500/10"
                style={{ border: '1px solid rgba(16,185,129,0.35)' }}
            >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" style={{ animation: 'ping 1.5s ease-in-out infinite' }} />
                {lang === 'en' ? 'OPEN TO OPPORTUNITIES' : lang === 'ru' ? 'ОТКРЫТ К ПРЕДЛОЖЕНИЯМ' : 'IMKONIYATLARGA OCHIQ'}
            </motion.div>

            {/* Name */}
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tight leading-none mb-6"
                style={{ fontFamily: 'var(--font-main)' }}
            >
                <span className="text-white">Abdulaziz</span>
            </motion.h1>

            {/* Typing role */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-lg md:text-2xl text-slate-400 mb-5 h-8 flex items-center justify-center font-mono"
            >
                <TypeWriter texts={ROLES} />
            </motion.div>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed"
            >
                {lang === 'en'
                    ? 'I build scalable, secure, production-ready backend systems.'
                    : lang === 'ru'
                        ? 'Строю масштабируемые, безопасные backend-системы для продакшена.'
                        : 'Ishlab chiqarishga tayyor, kengaytiriladigan backend tizimlari yarataman.'}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full px-4"
            >
                <motion.button
                    onClick={() => scrollTo('projects')}
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    id="hero-view-projects"
                    className="group flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-base text-white
            magnetic-btn tracking-widest uppercase whitespace-nowrap w-full sm:w-auto
            transition-all duration-300"
                    style={{
                        background: 'linear-gradient(135deg, #a855f7, #6366f1, #06b6d4)',
                        boxShadow: '0 0 30px rgba(168,85,247,0.35), 0 0 60px rgba(6,182,212,0.12)',
                    }}
                >
                    {lang === 'en' ? 'View Projects' : lang === 'ru' ? 'Проекты' : 'Loyihalar'}
                    <HiArrowDown className="group-hover:translate-y-1 transition-transform duration-300" />
                </motion.button>

                <motion.a
                    href="/cv.pdf"
                    download
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    id="hero-download-cv"
                    className="flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-base text-slate-300
            magnetic-btn glass neon-border-purple hover:text-white tracking-widest uppercase whitespace-nowrap w-full sm:w-auto
            transition-all duration-300 hover:bg-purple-600/10"
                >
                    <FiDownload />
                    {lang === 'en' ? 'Download CV' : lang === 'ru' ? 'Скачать CV' : 'CV Yuklab olish'}
                </motion.a>
            </motion.div>

            {/* Tech pill strip */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="flex flex-wrap justify-center gap-2 mt-16"
            >
                {['Node.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'TypeScript', 'JWT'].map((t, i) => (
                    <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.06 }}
                        className="px-3 py-1.5 rounded-full text-sm font-mono font-semibold text-slate-500 glass-light tracking-wider"
                        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        {t}
                    </motion.span>
                ))}
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-1"
                >
                    <div
                        className="w-px h-12 rounded-full"
                        style={{ background: 'linear-gradient(180deg, rgba(168,85,247,0.7), transparent)' }}
                    />
                    <span className="text-[10px] font-mono text-slate-600 tracking-widest uppercase">scroll</span>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero
