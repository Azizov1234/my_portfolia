import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { FaTelegram } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

const T = {
    en: { label: 'Abdulaziz — Backend Engineer', rights: 'All rights reserved.' },
    ru: { label: 'Abdulaziz — Backend-разработчик', rights: 'Все права защищены.' },
    uz: { label: "Abdulaziz — Backend muhandisi", rights: 'Barcha huquqlar himoyalangan.' },
}

const Footer = ({ lang }) => {
    const t = T[lang] || T.en
    return (
        <footer className="relative z-10 border-t py-12 w-full flex flex-col items-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="w-full max-w-6xl px-4 sm:px-6 flex flex-col items-center">
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="font-mono text-lg font-bold gradient-text mb-1">{'<AZ />'}</div>
                        <div className="text-sm font-mono text-slate-600">{t.label}</div>
                    </div>

                    <div className="flex items-center gap-3">
                        {[
                            { Icon: FiGithub, href: 'https://github.com/abdulaziz', label: 'GitHub' },
                            { Icon: FiLinkedin, href: 'https://linkedin.com/in/abdulaziz', label: 'LinkedIn' },
                            { Icon: FaTelegram, href: 'https://t.me/abdulaziz_dev', label: 'Telegram' },
                            { Icon: HiMail, href: 'mailto:abdulaziz@email.com', label: 'Email' },
                        ].map(({ Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith('mailto') ? '_self' : '_blank'}
                                rel="noreferrer"
                                aria-label={label}
                                whileHover={{ y: -3, scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2.5 rounded-xl glass border border-white/8 text-slate-500 hover:text-white transition-all hover:border-purple-500/30 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                            >
                                <Icon size={15} />
                            </motion.a>
                        ))}
                    </div>

                    <div className="text-sm font-mono text-slate-700">
                        © 2026 Abdulaziz. {t.rights}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
