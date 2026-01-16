import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a191f] text-white selection:bg-secondary selection:text-white">
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ 
                     backgroundImage: 'radial-gradient(circle at 50% 50%, #fbbf24 0%, transparent 50%)',
                     filter: 'blur(100px)'
                 }} 
            />
            <div className="relative flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-10 relative"
                >
                    <div className="absolute inset-0 blur-3xl bg-secondary/10 rounded-full animate-pulse" />
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                        <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 text-secondary" />
                    </div>
                </motion.div>

                <div className="overflow-hidden flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl sm:text-6xl md:text-7xl font-merriweather font-bold tracking-tight text-center"
                    >
                        <span className="bg-gradient-to-br from-white via-white to-secondary/80 bg-clip-text text-transparent">
                            Moon Valley
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 1, letterSpacing: "0.4em" }}
                        transition={{ delay: 0.9, duration: 1.5, ease: "easeOut" }}
                        className="text-xs sm:text-sm font-light text-tropical/80 uppercase mt-4 text-center"
                    >
                        A Tropical Hut Experience
                    </motion.p>
                </div>

                <div className="w-64 h-[1px] bg-white/5 rounded-full overflow-hidden mt-16 relative">
                    <motion.div
                        className="h-full bg-secondary shadow-[0_0_20px_rgba(251,191,36,0.6)]"
                        initial={{ width: "0%", left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
