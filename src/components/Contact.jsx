import { motion } from 'framer-motion'
import { HiMail } from 'react-icons/hi'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaTelegram } from 'react-icons/fa'

const CONTACTS = [
    {
        id: 'contact-email',
        Icon: HiMail,
        label: 'Email',
        val: 'abdulaziz@email.com',
        href: 'mailto:abdulaziz@email.com',
        color: '#ea4335',
        desc: { en: 'Reach out directly', ru: 'Написать напрямую', uz: "To'g'ridan-to'g'ri yozing" },
    },
    {
        id: 'contact-telegram',
        Icon: FaTelegram,
        label: 'Telegram',
        val: '@abdulaziz_dev',
        href: 'https://t.me/abdulaziz_dev',
        color: '#0088cc',
        desc: { en: 'Fastest reply', ru: 'Быстрый ответ', uz: 'Eng tezkor javob' },
    },
    {
        id: 'contact-github',
        Icon: FiGithub,
        label: 'GitHub',
        val: 'github.com/abdulaziz',
        href: 'https://github.com/abdulaziz',
        color: '#e2e8f0',
        desc: { en: 'See my code', ru: 'Посмотреть код', uz: 'Kodlarni ko\'rish' },
    },
    {
        id: 'contact-linkedin',
        Icon: FiLinkedin,
        label: 'LinkedIn',
        val: 'Abdulaziz',
        href: 'https://linkedin.com/in/abdulaziz',
        color: '#0077b5',
        desc: { en: 'Professional network', ru: 'Деловая сеть', uz: 'Kasbiy tarmoq' },
    },
]

const T = {
    en: {
        tag: "Let's Build Together",
        h: 'Get in ',
        hs: 'Touch',
        p: 'Open to full-time roles, contracts and interesting backend challenges.',
        reply: '⚡ Usually responds within 24 hours',
    },
    ru: {
        tag: 'Работайте со мной',
        h: 'Связаться ',
        hs: 'со мной',
        p: 'Открыт к полной занятости, фрилансу и интересным backend-проектам.',
        reply: '⚡ Обычно отвечаю в течение 24 часов',
    },
    uz: {
        tag: "Birga ishlaymiz",
        h: 'Bog\'laning ',
        hs: 'men bilan',
        p: "To'liq bandlik, shartnomalar va qiziqarli backend loyihalarga ochiqman.",
        reply: '⚡ Odatda 24 soat ichida javob beraman',
    },
}

const Contact = ({ lang }) => {
    const t = T[lang] || T.en
    return (
        <section id="contact" className="relative z-10 section-pad w-full flex flex-col items-center">
            <div className="section-sep mb-24 w-full" />
            <div className="absolute left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-purple-600/8 blur-[100px] pointer-events-none" />

            <div className="w-full max-w-4xl px-4 sm:px-6 relative z-10 flex flex-col items-center">
                <div className="text-center mb-16">
                    <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="inline-block text-[10px] font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase mb-4">
                        {t.tag}
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t.h}<span className="gradient-text">{t.hs}</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}
                        className="text-slate-500 max-w-md mx-auto text-sm leading-loose">
                        {t.p}
                    </motion.p>
                </div>

                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {CONTACTS.map((c) => (
                        <motion.a
                            key={c.id}
                            id={c.id}
                            href={c.href}
                            target={c.href.startsWith('mailto') ? '_self' : '_blank'}
                            rel="noreferrer"
                            variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-[calc(50%-0.5rem)] max-w-sm flex-shrink-0 neon-border-animated glass rounded-2xl p-6 flex items-center gap-5 border border-white/5 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                style={{ background: `${c.color}06` }} />

                            <motion.div className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                                style={{ background: `${c.color}18`, color: c.color }}
                                whileHover={{ rotate: 8, scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}>
                                <c.Icon />
                            </motion.div>

                            <div className="relative z-10 flex-1 min-w-0">
                                <div className="text-[10px] font-mono text-slate-600 mb-0.5 uppercase tracking-wider">
                                    {c.desc[lang] || c.desc.en}
                                </div>
                                <div className="text-white font-bold text-sm mb-0.5">{c.label}</div>
                                <div className="text-xs font-mono truncate" style={{ color: c.color }}>{c.val}</div>
                            </div>

                            <div className="relative z-10 text-slate-700 group-hover:text-slate-300 transition-colors text-base ml-2">→</div>
                        </motion.a>
                    ))}
                </motion.div>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
                    className="text-center text-slate-600 text-xs font-mono mt-10">
                    {t.reply}
                </motion.p>
            </div>
        </section>
    )
}

export default Contact
