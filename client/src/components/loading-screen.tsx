import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="relative flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-6 relative"
                >
                    <div className="absolute inset-0 blur-xl bg-secondary/30 rounded-full animate-pulse" />
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative z-10">
                        <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-secondary animate-pulse" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold tracking-wider text-center"
                >
                    <span className="bg-gradient-to-r from-white via-white to-secondary bg-clip-text text-transparent">
                        MOON VALLEY
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-4 flex flex-col items-center gap-2"
                >
                    <p className="text-sm sm:text-base font-light text-gray-400 tracking-[0.2em] uppercase">
                        A Tropical Hut Experience
                    </p>

                    <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mt-6">
                        <motion.div
                            className="h-full bg-secondary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                repeat: Infinity
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
