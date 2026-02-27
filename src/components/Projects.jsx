import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { SiNestjs, SiPrisma, SiPostgresql, SiReact, SiTypescript, SiNodedotjs, SiRedis, SiDocker } from 'react-icons/si'
import { MdSecurity } from 'react-icons/md'

const TECH_META = {
    NestJS: { icon: <SiNestjs />, color: '#e0234e' },
    Prisma: { icon: <SiPrisma />, color: '#5a67d8' },
    PostgreSQL: { icon: <SiPostgresql />, color: '#336791' },
    React: { icon: <SiReact />, color: '#61dafb' },
    TypeScript: { icon: <SiTypescript />, color: '#3178c6' },
    'Node.js': { icon: <SiNodedotjs />, color: '#68a063' },
    Redis: { icon: <SiRedis />, color: '#dc382d' },
    Docker: { icon: <SiDocker />, color: '#2496ed' },
    JWT: { icon: <MdSecurity />, color: '#f59e0b' },
}

const PROJECTS = [
    {
        id: 'auth-system',
        title: { en: 'Auth System', ru: 'Auth-система', uz: 'Auth tizimi' },
        desc: {
            en: 'Full JWT authentication with refresh token rotation, role-based access control, bcrypt password hashing, and email verification flow.',
            ru: 'Полная JWT-аутентификация с ротацией refresh-токенов, RBAC, bcrypt и верификацией email.',
            uz: "To'liq JWT autentifikatsiya: refresh token, RBAC, bcrypt parol hash va email tekshiruvi.",
        },
        tech: ['NestJS', 'Prisma', 'PostgreSQL', 'JWT'],
        gradient: 'from-purple-900/40 to-indigo-900/20',
        accent: '#a855f7',
        badge: { en: '🔒 Security', ru: '🔒 Безопасность', uz: '🔒 Xavfsizlik' },
        github: 'https://github.com/abdulaziz',
        demo: '#',
    },
    {
        id: 'subscription',
        title: { en: 'Subscription System', ru: 'Система подписок', uz: 'Obuna tizimi' },
        desc: {
            en: 'User subscription management with cron-based expiration logic, plan tiers, Stripe webhook integration, and detailed usage analytics.',
            ru: 'Управление подписками с cron-логикой, тарифами, Stripe-вебхуками и аналитикой.',
            uz: "Cron-logika, tarif rejalari, Stripe webhook va batafsil analitika bilan obuna boshqaruvi.",
        },
        tech: ['NestJS', 'Prisma', 'PostgreSQL', 'Redis'],
        gradient: 'from-cyan-900/35 to-blue-900/20',
        accent: '#06b6d4',
        badge: { en: '💳 Payments', ru: '💳 Платежи', uz: '💳 To\'lovlar' },
        github: 'https://github.com/abdulaziz',
        demo: '#',
    },
    {
        id: 'movie-api',
        title: { en: 'Movie REST API', ru: 'Movie REST API', uz: 'Movie REST API' },
        desc: {
            en: 'Production-ready Movie management API with categories, search/filter, admin RBAC, pagination, and Swagger documentation.',
            ru: 'Movie API с категориями, поиском, RBAC, пагинацией и Swagger-документацией.',
            uz: "Kategoriyalar, qidiruv, RBAC, sahifalash va Swagger hujjatlashtirish bilan Movie API.",
        },
        tech: ['NestJS', 'PostgreSQL', 'TypeScript', 'Docker'],
        gradient: 'from-emerald-900/35 to-teal-900/20',
        accent: '#10b981',
        badge: { en: '🎬 Media', ru: '🎬 Медиа', uz: '🎬 Media' },
        github: 'https://github.com/abdulaziz',
        demo: '#',
    },
    {
        id: 'boilerplate',
        title: { en: 'REST API Boilerplate', ru: 'REST Шаблон', uz: 'REST API shablon' },
        desc: {
            en: 'Opinionated NestJS boilerplate with Docker, CI/CD pipelines, Prisma, Swagger, global exception filters and request validation.',
            ru: 'NestJS-шаблон: Docker, CI/CD, Prisma, Swagger, валидация и обработка ошибок.',
            uz: "Docker, CI/CD, Prisma, Swagger, global xato filtrlari va validatsiya bilan NestJS shabloni.",
        },
        tech: ['NestJS', 'TypeScript', 'Docker', 'Node.js'],
        gradient: 'from-violet-900/35 to-purple-900/20',
        accent: '#8b5cf6',
        badge: { en: '⚡ Template', ru: '⚡ Шаблон', uz: '⚡ Shablon' },
        github: 'https://github.com/abdulaziz',
        demo: '#',
    },
]

const T = {
    en: { tag: 'Portfolio', h: 'Featured ', hs: 'Projects', sub: 'Backend-first applications built for production.' },
    ru: { tag: 'Портфолио', h: 'Проекты', hs: '', sub: 'Продакшн‑ready backend-приложения.' },
    uz: { tag: 'Portfolio', h: 'Loyihalar', hs: '', sub: "Ishlab chiqarishga mo'ljallangan backend ilovalar." },
}

const TiltCard = ({ project, lang }) => {
    const cardRef = useRef(null)
    const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })
    const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })
    const [hovered, setHovered] = useState(false)

    const onMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect()
        if (!rect) return
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 8)
        rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 8)
    }
    const onMouseLeave = () => { rotateX.set(0); rotateY.set(0); setHovered(false) }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseEnter={() => setHovered(true)}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
            className="relative cursor-default"
        >
            <motion.div
                className="glass rounded-3xl p-8 border border-white/5 flex flex-col h-full relative overflow-hidden transition-shadow duration-400"
                animate={hovered
                    ? { boxShadow: `0 25px 80px rgba(0,0,0,0.5), 0 0 40px ${project.accent}20` }
                    : { boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }
                }
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`} />
                <div className="absolute inset-0 rounded-3xl transition-opacity duration-400"
                    style={{ boxShadow: `inset 0 0 0 1px ${project.accent}40`, opacity: hovered ? 1 : 0 }} />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            <span
                                className="inline-block text-xs font-mono font-bold px-3 py-1.5 rounded-full mb-3 tracking-wider"
                                style={{ color: project.accent, background: `${project.accent}18`, border: `1px solid ${project.accent}30` }}
                            >
                                {project.badge[lang] || project.badge.en}
                            </span>
                            <h3 className="text-2xl font-bold text-white leading-tight">{project.title[lang] || project.title.en}</h3>
                        </div>
                        <div className="flex gap-2 mt-1">
                            {[{ href: project.github, Icon: FiGithub, label: 'GitHub' }, { href: project.demo, Icon: FiExternalLink, label: 'Live' }].map(({ href, Icon, label }) => (
                                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                                    whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                    className="p-2.5 rounded-xl glass border border-white/8 text-slate-500 hover:text-white transition-colors"
                                    aria-label={label}
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                        {project.desc[lang] || project.desc.en}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => {
                            const m = TECH_META[t]
                            return (
                                <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold glass border border-white/8" style={{ color: m?.color }}>
                                    <span>{m?.icon}</span>{t}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

const Projects = ({ lang }) => {
    const t = T[lang] || T.en
    return (
        <section id="projects" className="relative z-10 section-pad w-full flex flex-col items-center">
            <div className="section-sep mb-24 w-full" />
            <div className="w-full max-w-5xl px-4 sm:px-6 flex flex-col items-center">
                <div className="text-center mb-16">
                    <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="inline-block text-[10px] font-mono font-bold tracking-[0.3em] text-purple-400 uppercase mb-4">
                        {t.tag}
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t.h}<span className="gradient-text">{t.hs}</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}
                        className="text-slate-500 max-w-md mx-auto text-sm">
                        {t.sub}
                    </motion.p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {PROJECTS.map((p, i) => (
                        <motion.div key={p.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                            className="w-full md:w-[calc(50%-0.75rem)] max-w-lg flex-shrink-0"
                        >
                            <TiltCard project={p} lang={lang} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
