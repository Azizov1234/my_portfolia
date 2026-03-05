import { motion } from 'framer-motion'

const SystemThinking = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1]
            }
        }
    }

    const cards = [
        {
            title: "Architecture First",
            description: "I believe that code is secondary to structure. A well-designed system should be able to evolve without constant friction, using patterns like Clean Architecture and DDD to separate concerns.",
            label: "01"
        },
        {
            title: "Scalable Modeling",
            description: "Database modeling isn't just about tables; it's about data integrity and performance at scale. I focus on normalized schemas that handle concurrent load while remaining developer-friendly.",
            label: "02"
        },
        {
            title: "API Excellence",
            description: "APIs are the contracts of your system. I build self-documenting, RESTful, and type-safe interfaces that prioritize the developer experience and system reliability.",
            label: "03"
        }
    ]

    return (
        <section id="thinking" className="py-32 bg-[#0D0D0D]">
            <div className="grid-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={sectionVariants}
                    className="col-span-12 lg:col-span-12 mb-20"
                >
                    <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">Philosophy</span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl text-text-primary mb-8 tracking-tighter">
                        System Thinking
                    </h2>
                    <div className="w-24 h-1 bg-accent mb-8"></div>
                    <p className="text-editorial-body text-2xl md:text-3xl max-w-5xl">
                        I approach engineering not just as writing code, but as designing durable infrastructure
                        that powers business logic with precision and reliability.
                    </p>
                </motion.div>

                <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: idx * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }
                                }
                            }}
                            className="flex flex-col border-t border-border-subtle pt-8"
                        >
                            <span className="font-mono text-accent text-base mb-6">{card.label}</span>
                            <h3 className="text-2xl text-text-primary mb-6 font-headline tracking-tight">{card.title}</h3>
                            <p className="text-text-secondary leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SystemThinking
