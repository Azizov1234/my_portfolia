import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    SiNodedotjs, SiNestjs, SiExpress, SiPostgresql,
    SiPrisma, SiRedis, SiReact, SiTailwindcss,
    SiDocker, SiVercel, SiGithubactions, SiTypescript,
} from 'react-icons/si'
import { TbBrandFramerMotion } from 'react-icons/tb'
import { MdSecurity } from 'react-icons/md'

const STACKS = [
    {
        cat: { en: 'Backend', ru: 'Бэкенд', uz: 'Backend' },
        color: '#a855f7',
        items: [
            { icon: <SiNodedotjs />, label: 'Node.js', level: 88 },
            { icon: <SiNestjs />, label: 'NestJS', level: 85 },
            { icon: <SiExpress />, label: 'Express', level: 82 },
            { icon: <MdSecurity />, label: 'JWT Auth', level: 90 },
        ],
    },
    {
        cat: { en: 'Database', ru: 'База данных', uz: "Ma'lumotlar bazasi" },
        color: '#06b6d4',
        items: [
            { icon: <SiPostgresql />, label: 'PostgreSQL', level: 84 },
            { icon: <SiPrisma />, label: 'Prisma ORM', level: 86 },
            { icon: <SiRedis />, label: 'Redis', level: 70 },
        ],
    },
    {
        cat: { en: 'Frontend', ru: 'Фронтенд', uz: 'Frontend' },
        color: '#6366f1',
        items: [
            { icon: <SiReact />, label: 'React', level: 78 },
            { icon: <SiTailwindcss />, label: 'Tailwind', level: 80 },
            { icon: <TbBrandFramerMotion />, label: 'Framer Motion', level: 70 },
            { icon: <SiTypescript />, label: 'TypeScript', level: 82 },
        ],
    },
    {
        cat: { en: 'DevOps', ru: 'DevOps', uz: 'DevOps' },
        color: '#10b981',
        items: [
            { icon: <SiDocker />, label: 'Docker', level: 65 },
            { icon: <SiVercel />, label: 'Vercel', level: 85 },
            { icon: <SiGithubactions />, label: 'CI/CD', level: 70 },
        ],
    },
]

const SkillCard = ({ icon, label, level, color }) => {
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="neon-border-animated glass rounded-2xl p-5 cursor-default group relative overflow-hidden"
        >
            {/* Corner glow */}
            <div
                className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: color }}
            />

            <div className="flex items-center gap-3 mb-4">
                <div
                    className="p-2.5 rounded-xl text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ color, background: `${color}18` }}
                >
                    {icon}
                </div>
                <span className="text-slate-200 font-semibold text-sm">{label}</span>
                <span className="ml-auto text-xs font-mono text-slate-600">{level}%</span>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 6px ${color}` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
                />
            </div>
        </motion.div>
    )
}

const TechStack = ({ lang }) => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="stack" className="relative z-10 section-pad w-full flex flex-col items-center">
            <div className="section-sep mb-24 w-full" />
            <div className="w-full max-w-5xl px-4 sm:px-6 flex flex-col items-center">

                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-[10px] font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase mb-4"
                    >
                        {lang === 'en' ? 'Technical Arsenal' : lang === 'ru' ? 'Технологии' : 'Texnologiyalar'}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 }}
                        className="text-4xl md:text-5xl font-bold text-white"
                    >
                        {lang === 'en' ? 'Tech ' : lang === 'ru' ? 'Стек ' : 'Tech '}<span className="gradient-text">Stack</span>
                    </motion.h2>
                </div>

                <div ref={ref} className="space-y-14">
                    {STACKS.map((group, gi) => (
                        <div key={gi}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: gi * 0.06 }}
                                className="flex items-center justify-center gap-3 mb-8"
                            >
                                <div className="w-1 h-6 rounded-full" style={{ background: group.color }} />
                                <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase" style={{ color: group.color }}>
                                    {group.cat[lang]}
                                </span>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                animate={inView ? 'show' : 'hidden'}
                                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: gi * 0.1 } } }}
                                className="flex flex-wrap gap-4 items-stretch justify-center"
                            >
                                {group.items.map((item) => (
                                    <motion.div
                                        key={item.label}
                                        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                                        className="w-[calc(100%-1rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33%-0.75rem)] lg:w-[calc(25%-0.75rem)]"
                                    >
                                        <SkillCard {...item} color={group.color} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TechStack
