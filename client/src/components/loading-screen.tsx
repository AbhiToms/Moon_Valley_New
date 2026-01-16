import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 text-white selection:bg-secondary selection:text-white">
            <div className="relative flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 relative"
                >
                    <div className="absolute inset-0 blur-2xl bg-secondary/20 rounded-full animate-pulse" />
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center relative z-10 shadow-2xl">
                        <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-secondary" />
                    </div>
                </motion.div>

                <div className="overflow-hidden flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tighter text-center"
                    >
                        <span className="bg-gradient-to-r from-white via-neutral-200 to-secondary bg-clip-text text-transparent">
                            MOON VALLEY
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-sm sm:text-base font-light text-gray-400 tracking-[0.3em] uppercase mt-2"
                    >
                        A Tropical Hut Experience
                    </motion.p>
                </div>

                <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-12 relative">
                    <motion.div
                        className="h-full bg-secondary shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                        initial={{ width: "0%", left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
