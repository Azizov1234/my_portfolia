import { motion } from 'framer-motion'
import { FiGithub, FiStar, FiCode, FiExternalLink } from 'react-icons/fi'

const REPOS = [
    { name: 'auth-nest-api', desc: 'JWT Auth system with NestJS', stars: 12, lang: 'TypeScript', color: '#3178c6' },
    { name: 'movie-rest-api', desc: 'Movie management REST API', stars: 8, lang: 'TypeScript', color: '#3178c6' },
    { name: 'subscription-sys', desc: 'Subscription + cron expiry system', stars: 6, lang: 'TypeScript', color: '#3178c6' },
    { name: 'nestjs-boilerplate', desc: 'Production NestJS starter template', stars: 18, lang: 'TypeScript', color: '#3178c6' },
]

const T = {
    en: {
        tag: 'Open Source',
        h: 'GitHub ',
        hs: 'Profile',
        p: 'Explore my open-source work, contributions and repositories.',
        repos: 'Repositories',
        stars: 'Stars Earned',
        commits: 'Commits',
        btn: 'View GitHub Profile',
    },
    ru: {
        tag: 'Open Source',
        h: 'GitHub ',
        hs: 'Profile',
        p: 'Мои open-source проекты, контрибуции и репозитории.',
        repos: 'Репозитории',
        stars: 'Звёзды',
        commits: 'Коммиты',
        btn: 'Открыть GitHub',
    },
    uz: {
        tag: 'Ochiq manba',
        h: 'GitHub ',
        hs: 'Profil',
        p: "Mening ochiq manba loyihalarim, hissalarım va repozitoriyalarim.",
        repos: 'Repozitoriyalar',
        stars: 'Yulduzlar',
        commits: 'Commitlar',
        btn: 'GitHub profilini ko\'rish',
    },
}

const GithubSection = ({ lang }) => {
    const t = T[lang] || T.en
    return (
        <section id="github" className="relative z-10 py-24 w-full flex flex-col items-center">
            <div className="section-sep mb-24 w-full" />
            <div className="w-full max-w-5xl px-4 sm:px-6 flex flex-col items-center">

                <div className="text-center mb-14">
                    <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="inline-block text-[10px] font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase mb-4">
                        {t.tag}
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
                        className="text-4xl md:text-5xl font-bold text-white">
                        {t.h}<span className="gradient-text">{t.hs}</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}
                        className="text-slate-500 max-w-md mx-auto text-sm mt-4">{t.p}</motion.p>
                </div>

                {/* Stats */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mb-10">
                    {[
                        { icon: <FiGithub />, label: t.repos, val: '15+' },
                        { icon: <FiStar />, label: t.stars, val: '44+' },
                        { icon: <FiCode />, label: t.commits, val: '300+' },
                    ].map((s, i) => (
                        <motion.div key={i} whileHover={{ y: -4, scale: 1.03 }}
                            className="w-full sm:w-[calc(33.333%-0.75rem)] max-w-xs glass rounded-2xl p-6 text-center border border-white/5 hover:border-purple-500/20 transition-all flex-shrink-0">
                            <div className="text-purple-400 flex justify-center mb-2 text-xl">{s.icon}</div>
                            <div className="text-2xl font-bold gradient-text mb-1">{s.val}</div>
                            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{s.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Repo cards */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {REPOS.map((repo, i) => (
                        <motion.div key={repo.name}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -5 }}
                            className="w-full md:w-[calc(50%-0.5rem)] max-w-lg glass neon-border-animated rounded-2xl p-5 border border-white/5 group flex-shrink-0">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <FiGithub className="text-slate-500 text-sm" />
                                    <span className="font-mono font-bold text-sm text-white">{repo.name}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-yellow-400">
                                    <FiStar size={11} /> {repo.stars}
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs mb-3">{repo.desc}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: repo.color }} />
                                    <span className="text-xs text-slate-500 font-mono">{repo.lang}</span>
                                </div>
                                <a href="https://github.com/abdulaziz" target="_blank" rel="noreferrer"
                                    className="text-slate-600 hover:text-purple-400 transition-colors">
                                    <FiExternalLink size={12} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <motion.a href="https://github.com/abdulaziz" target="_blank" rel="noreferrer" id="github-profile-cta"
                        whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-sm text-white magnetic-btn tracking-wider uppercase transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1, #06b6d4)', boxShadow: '0 0 30px rgba(168,85,247,0.3)' }}>
                        <FiGithub size={16} />
                        {t.btn}
                    </motion.a>
                </div>
            </div>
        </section>
    )
}

export default GithubSection
