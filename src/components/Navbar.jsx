import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const navLinks = [
    { id: 'home', label: { en: 'Home', ru: 'Главная', uz: 'Bosh' } },
    { id: 'about', label: { en: 'About', ru: 'Обо мне', uz: 'Haqimda' } },
    { id: 'stack', label: { en: 'Stack', ru: 'Стек', uz: 'Stack' } },
    { id: 'architecture', label: { en: 'Architecture', ru: 'Арх-ра', uz: 'Arxit.' } },
    { id: 'projects', label: { en: 'Projects', ru: 'Проекты', uz: 'Loyihalar' } },
    { id: 'contact', label: { en: 'Contact', ru: 'Контакт', uz: 'Aloqa' } },
]

const Navbar = ({ lang, setLang }) => {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState('home')
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40)
            for (let i = navLinks.length - 1; i >= 0; i--) {
                const el = document.getElementById(navLinks[i].id)
                if (el && window.scrollY >= el.offsetTop - 140) {
                    setActive(navLinks[i].id); break
                }
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (id) => {
        setMenuOpen(false)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-500
          ${scrolled ? 'glass shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3' : 'py-5'}`}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <motion.button
                        onClick={() => scrollTo('home')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="font-mono text-lg font-bold gradient-text tracking-tight"
                    >
                        {'<AZ />'}
                    </motion.button>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.id}
                                onClick={() => scrollTo(link.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative px-4 py-2 text-[13px] font-semibold rounded-lg tracking-wide uppercase transition-colors
                  ${active === link.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {active === link.id && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-lg"
                                        style={{
                                            background: 'rgba(168,85,247,0.12)',
                                            border: '1px solid rgba(168,85,247,0.3)',
                                            boxShadow: '0 0 12px rgba(168,85,247,0.2)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label[lang]}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-3">
                        {/* Lang toggle */}
                        <div className="flex items-center glass-light border border-white/10 rounded-lg p-1 text-sm font-mono font-bold flex-shrink-0">
                            {(['en', 'ru', 'uz']).map((l) => (
                                <motion.button
                                    key={l}
                                    onClick={() => setLang(l)}
                                    whileTap={{ scale: 0.9 }}
                                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-all uppercase tracking-wider whitespace-nowrap ${lang === l
                                        ? 'bg-purple-600/80 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                                        : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                >
                                    {l}
                                </motion.button>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.button
                            onClick={() => scrollTo('contact')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex magnetic-btn items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wider uppercase
                neon-border-purple text-purple-300 hover:text-white hover:bg-purple-600/20
                transition-all duration-300"
                        >
                            {lang === 'en' ? "Let's Talk" : lang === 'ru' ? 'Связаться' : 'Bog\u02bclaning'}
                        </motion.button>

                        {/* Mobile toggle */}
                        <button
                            className="md:hidden text-slate-400 hover:text-white transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        className="fixed top-16 inset-x-4 z-40 glass-dark rounded-2xl p-5 md:hidden"
                        style={{ border: '1px solid rgba(168,85,247,0.2)' }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.id}
                                onClick={() => scrollTo(link.id)}
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold tracking-wider uppercase transition-all
                  ${active === link.id
                                        ? 'text-purple-300 bg-purple-600/15 border border-purple-500/20'
                                        : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}
                            >
                                {link.label[lang]}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
