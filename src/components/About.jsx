import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CONTENT = {
    en: {
        tag: 'About Me',
        heading: ['Engineered for', 'performance.'],
        body1: 'Backend-focused FullStack developer with bootcamp experience and hands-on REST API, authentication systems, database architecture and deployment workflows.',
        body2: 'I focus on performance, scalability and clean architecture — writing code that is as maintainable at 10x scale as it is on day one.',
        available: 'Available for hire',
        experience: 'Experience',
        focus: 'Core Focus',
        skills: 'Clean Code',
        expVal: '2+ yrs',
        focusVal: 'Backend',
        comment: '> philosophy',
    },
    ru: {
        tag: 'Обо мне',
        heading: ['Создан для', 'производительности.'],
        body1: 'Backend-ориентированный FullStack-разработчик с опытом построения REST API, систем аутентификации, архитектуры баз данных и деплоя.',
        body2: 'Акцент на производительности, масштабируемости и чистой архитектуре — код, который легко поддерживать при любом масштабе.',
        available: 'Открыт к работе',
        experience: 'Опыт',
        focus: 'Фокус',
        skills: 'Чистый код',
        expVal: '2+ лет',
        focusVal: 'Backend',
        comment: '> философия',
    },
    uz: {
        tag: "Men haqimda",
        heading: ["Samaradorlik uchun", "yaratilgan."],
        body1: "Bootcamp tajribasi bilan REST API, autentifikatsiya tizimlari, ma'lumotlar bazasi arxitekturasi va deploy jarayonlarini qo'lda amalga oshirgan backend-yo'nalishli FullStack dasturchi.",
        body2: "Mening e'tiborim — samaradorlik, kengaytirilish imkoniyati va toza arxitektura. Har qanday miqyosda saqlanishi oson kod yozaman.",
        available: "Ishga tayyor",
        experience: "Tajriba",
        focus: "Asosiy yo'nalish",
        skills: "Toza kod",
        expVal: "2+ yil",
        focusVal: "Backend",
        comment: "> falsafa",
    },
}

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
}
const fade = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const About = ({ lang }) => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const c = CONTENT[lang] || CONTENT.en

    const stats = [
        { label: c.experience, val: c.expVal },
        { label: c.focus, val: c.focusVal },
        { label: c.skills, val: '100%' },
    ]

    return (
        <section id="about" className="relative z-10 section-pad w-full flex flex-col items-center">
            <div className="section-sep mb-6 w-full" />
            <div className="w-full max-w-6xl px-4 sm:px-6 flex flex-col items-center">
                <motion.div
                    ref={ref}
                    variants={stagger}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                    className="flex flex-col lg:flex-row gap-12 items-start lg:justify-center w-full"
                >
                    {/* Left text */}
                    <div className="text-center lg:text-left md:max-w-xl flex flex-col items-center lg:items-start flex-1">
                        <motion.span variants={fade} className="inline-block text-[12px] font-mono font-bold tracking-[0.4em] text-purple-400 uppercase mb-6">
                            {c.tag}
                        </motion.span>

                        <motion.h2 variants={fade} className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
                            {c.heading[0]}
                            <br />
                            <span className="gradient-text">{c.heading[1]}</span>
                        </motion.h2>

                        <motion.p variants={fade} className="text-slate-400 leading-loose mb-5 text-[17px] max-w-xl">
                            {c.body1}
                        </motion.p>
                        <motion.p variants={fade} className="text-slate-500 leading-loose text-[17px] mb-12 max-w-xl">
                            {c.body2}
                        </motion.p>

                        <motion.div variants={fade} className="flex justify-center">
                            <div className="inline-flex items-center justify-center gap-2.5 px-6 py-3 mt-4 rounded-xl glass neon-border-purple whitespace-nowrap">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" style={{ animation: 'ping 1.5s infinite' }} />
                                <span className="text-sm sm:text-base font-mono font-semibold text-emerald-400 tracking-wider uppercase">{c.available}</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: stats + code card */}
                    <div className="w-full lg:w-auto lg:min-w-[340px] flex-shrink-0 space-y-5">
                        <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-3 gap-3">
                            {stats.map((s) => (
                                <motion.div
                                    key={s.label}
                                    variants={fade}
                                    className="w-full sm:w-auto glass rounded-2xl p-6 sm:p-5 text-center border border-white/5 hover:border-purple-500/20 transition-colors"
                                >
                                    <div className="text-3xl font-bold gradient-text mb-1">{s.val}</div>
                                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            variants={fade}
                            className="glass rounded-2xl p-7 border border-white/5 hover:border-cyan-500/15 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />
                            <div className="font-mono text-cyan-400 text-sm mb-3 tracking-widest uppercase opacity-70">
                                {c.comment}
                            </div>
                            <div className="font-mono text-slate-300 text-base leading-loose">
                                <span className="text-purple-400">const</span>{' '}
                                <span className="text-cyan-300">engineer</span>{' '}
                                <span className="text-white">=</span>{' '}{'{'}<br />
                                &nbsp;&nbsp;<span className="text-blue-300">focus</span>:{' '}
                                <span className="text-green-400">'clean architecture'</span>,<br />
                                &nbsp;&nbsp;<span className="text-blue-300">scale</span>:{' '}
                                <span className="text-green-400">'production first'</span>,<br />
                                &nbsp;&nbsp;<span className="text-blue-300">code</span>:{' '}
                                <span className="text-green-400">'maintainable'</span><br />
                                {'}'}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default About
