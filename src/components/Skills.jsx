import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    SiNestjs, SiPrisma, SiPostgresql, SiNodedotjs, SiReact, SiTypescript,
    SiDocker, SiGit, SiJavascript, SiExpress, SiRedis, SiSwagger,
} from 'react-icons/si'

const skillGroups = [
    {
        category: 'Core Stack',
        color: '#a855f7',
        skills: [
            { icon: <SiNodedotjs />, label: 'Node.js', level: 90 },
            { icon: <SiNestjs />, label: 'NestJS', level: 88 },
            { icon: <SiTypescript />, label: 'TypeScript', level: 85 },
            { icon: <SiJavascript />, label: 'JavaScript', level: 92 },
        ],
    },
    {
        category: 'Database & ORM',
        color: '#06b6d4',
        skills: [
            { icon: <SiPrisma />, label: 'Prisma', level: 87 },
            { icon: <SiPostgresql />, label: 'PostgreSQL', level: 85 },
            { icon: <SiRedis />, label: 'Redis', level: 70 },
        ],
    },
    {
        category: 'Tools & Frontend',
        color: '#818cf8',
        skills: [
            { icon: <SiReact />, label: 'React', level: 78 },
            { icon: <SiDocker />, label: 'Docker', level: 72 },
            { icon: <SiGit />, label: 'Git', level: 88 },
            { icon: <SiSwagger />, label: 'Swagger', level: 82 },
        ],
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

const SkillCard = ({ icon, label, level, groupColor }) => (
    <motion.div
        variants={cardVariants}
        whileHover={{ y: -6, scale: 1.03 }}
        className="glass card-hover rounded-2xl p-5 border border-white/5 cursor-default group"
    >
        <div className="flex items-center gap-3 mb-4">
            <div
                className="text-2xl p-2.5 rounded-xl transition-all group-hover:scale-110"
                style={{ color: groupColor, background: `${groupColor}18` }}
            >
                {icon}
            </div>
            <span className="text-slate-200 font-medium text-base">{label}</span>
            <span className="ml-auto text-sm text-slate-500 font-mono">{level}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${groupColor}, ${groupColor}88)` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            />
        </div>
    </motion.div>
)

const Skills = () => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="skills" className="relative z-10 section-padding">
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-4"
                    >
                        Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold text-white"
                    >
                        Technical <span className="gradient-text">Skills</span>
                    </motion.h2>
                </div>

                {/* Skill groups */}
                <div ref={ref} className="space-y-12">
                    {skillGroups.map((group, gi) => (
                        <div key={group.category}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: gi * 0.1 }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <div
                                    className="w-1 h-6 rounded-full"
                                    style={{ background: group.color }}
                                />
                                <span className="text-base font-semibold text-slate-400 uppercase tracking-wider">
                                    {group.category}
                                </span>
                            </motion.div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                            >
                                {group.skills.map((skill) => (
                                    <SkillCard
                                        key={skill.label}
                                        {...skill}
                                        groupColor={group.color}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
