import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const FLOWS = [
    {
        id: 'api',
        label: { en: 'API Request Flow', ru: 'Поток API-запроса', uz: 'API So\'rov oqimi' },
        color: '#a855f7',
        steps: [
            { id: 'client', label: 'Client', sub: 'React / Mobile' },
            { id: 'gateway', label: 'API Gateway', sub: 'Rate Limit & Auth' },
            { id: 'controller', label: 'Controller', sub: 'NestJS Handler' },
            { id: 'service', label: 'Service', sub: 'Business Logic' },
            { id: 'db', label: 'PostgreSQL', sub: 'Prisma ORM' },
        ],
    },
    {
        id: 'auth',
        label: { en: 'Auth Flow', ru: 'Аутентификация', uz: 'Autentifikatsiya' },
        color: '#06b6d4',
        steps: [
            { id: 'login', label: 'Login', sub: 'Credentials' },
            { id: 'validate', label: 'Validate', sub: 'bcrypt compare' },
            { id: 'jwt', label: 'JWT Sign', sub: 'Access + Refresh' },
            { id: 'guard', label: 'Guard', sub: 'JWT Strategy' },
            { id: 'resource', label: 'Resource', sub: 'Protected Route' },
        ],
    },
    {
        id: 'db',
        label: { en: 'DB Architecture', ru: 'Архитектура БД', uz: 'MB Arxitekturasi' },
        color: '#10b981',
        steps: [
            { id: 'entities', label: 'Entities', sub: 'Users / Roles' },
            { id: 'prisma', label: 'Prisma', sub: 'ORM Layer' },
            { id: 'migrate', label: 'Migrations', sub: 'Schema Versioning' },
            { id: 'cache', label: 'Redis', sub: 'Cache Layer' },
            { id: 'postgres', label: 'PostgreSQL', sub: 'Primary Store' },
        ],
    },
]

const T = {
    en: { tag: 'System Design', h: 'Architecture ', hs: 'Showcase' },
    ru: { tag: 'Системный дизайн', h: 'Архитектура ', hs: 'системы' },
    uz: { tag: 'Tizim dizayni', h: 'Arxitektura ', hs: 'namoyishi' },
}

const Architecture = ({ lang }) => {
    const [active, setActive] = useState('api')
    const flow = FLOWS.find(f => f.id === active)
    const t = T[lang] || T.en

    return (
        <section id="architecture" className="relative z-10 section-pad w-full flex flex-col items-center">
            <div className="section-sep mb-6 w-full" />
            <div className="w-full max-w-6xl px-4 sm:px-6 flex flex-col items-center">

                <div className="text-center mb-10">
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-[10px] font-mono font-bold tracking-[0.3em] text-purple-400 uppercase mb-4"
                    >
                        {t.tag}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="text-5xl md:text-6xl font-bold text-white"
                    >
                        {t.h}<span className="gradient-text">{t.hs}</span>
                    </motion.h2>
                </div>

                {/* Tab selector */}
                <div className="flex justify-center gap-3 mb-8 flex-wrap">
                    {FLOWS.map((f) => (
                        <motion.button
                            key={f.id}
                            onClick={() => setActive(f.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2.5 rounded-xl text-sm font-mono font-bold tracking-wider uppercase transition-all ${active === f.id ? 'text-white' : 'glass text-slate-500 hover:text-slate-300 border border-white/5'
                                }`}
                            style={active === f.id ? {
                                background: `${f.color}25`,
                                border: `1px solid ${f.color}50`,
                                boxShadow: `0 0 20px ${f.color}20`,
                                color: f.color,
                            } : {}}
                        >
                            {f.label[lang] || f.label.en}
                        </motion.button>
                    ))}
                </div>

                {/* Flow diagram */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="glass rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden"
                    >
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full blur-3xl opacity-20"
                            style={{ background: flow?.color }}
                        />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
                            {flow?.steps.map((step, i) => (
                                <div key={step.id} className="flex flex-col md:flex-row items-center gap-3 md:gap-0">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1, duration: 0.4 }}
                                        whileHover={{ scale: 1.08, y: -4 }}
                                        className="relative flex flex-col items-center justify-center text-center w-40 h-32 md:w-44 md:h-36 rounded-2xl cursor-default flex-shrink-0"
                                        style={{
                                            background: `${flow.color}10`,
                                            border: `1px solid ${flow.color}35`,
                                            boxShadow: `0 0 20px ${flow.color}15`,
                                        }}
                                    >
                                        {i === 0 && (
                                            <div
                                                className="absolute inset-0 rounded-2xl bg-transparent"
                                                style={{ border: `1px solid ${flow.color}`, animation: 'pulseGlow 2s ease-in-out infinite' }}
                                            />
                                        )}
                                        <div className="font-mono font-bold text-base md:text-base mb-2 px-1" style={{ color: flow.color }}>{step.label}</div>
                                        <div className="text-sm text-slate-400 leading-tight px-3">{step.sub}</div>
                                    </motion.div>

                                    {i < (flow.steps.length - 1) && (
                                        <motion.div
                                            initial={{ opacity: 0, scaleX: 0 }}
                                            animate={{ opacity: 1, scaleX: 1 }}
                                            transition={{ delay: i * 0.1 + 0.05 }}
                                            className="flex-shrink-0 mx-2"
                                        >
                                            <FiArrowRight size={18} style={{ color: `${flow.color}60` }} className="md:rotate-0 rotate-90" />
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Architecture
