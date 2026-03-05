import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState('loading') // 'loading' | 'done'

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval)
                    setTimeout(() => { setPhase('done'); setTimeout(onComplete, 600) }, 200)
                    return 100
                }
                return p + Math.random() * 8 + 2
            })
        }, 60)
        return () => clearInterval(interval)
    }, [onComplete])

    const letters = 'ABDULAZIZ'.split('')

    return (
        <AnimatePresence>
            {phase === 'loading' && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                    style={{ background: 'var(--c-bg)' }}
                >
                    {/* Animated grid */}
                    <div className="absolute inset-0 overflow-hidden opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)`,
                                backgroundSize: '40px 40px',
                                animation: 'gridMove 3s linear infinite',
                            }}
                        />
                    </div>

                    {/* Glow orb */}
                    <div className="absolute w-64 h-64 rounded-full bg-purple-600/20 blur-[80px] animate-pulse" />

                    {/* Letters */}
                    <div className="flex gap-1 mb-10 relative z-10">
                        {letters.map((l, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07, duration: 0.5, ease: 'easeOut' }}
                                className="text-5xl md:text-6xl font-bold tracking-widest"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: i % 2 === 0 ? 'var(--neon-purple)' : 'white',
                                    textShadow: '0 0 20px rgba(168,85,247,0.8)',
                                }}
                            >
                                {l}
                            </motion.span>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="relative z-10 w-56 h-px bg-white/10 rounded-full overflow-hidden mb-4">
                        <motion.div
                            className="h-full"
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                                background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-cyan))',
                                boxShadow: '0 0 10px var(--neon-purple)',
                                transition: 'width 0.1s linear',
                            }}
                        />
                    </div>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative z-10 text-sm font-mono text-purple-400 tracking-widest"
                    >
                        {Math.min(Math.round(progress), 100)}%
                    </motion.span>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1 }}
                        className="relative z-10 mt-6 text-sm text-slate-600 font-mono tracking-[0.3em] uppercase"
                    >
                        Backend Engineer
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingScreen
