import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
 const { theme, setTheme } = useTheme();

 return (
 <Button
 variant="ghost"
 size="icon"
 onClick={() => setTheme(theme === "light" ? "dark" : "light")}
 className="h-10 w-10 rounded-full bg-neutral/20 /20 backdrop-blur-sm border border-gray-800/30 dark:border-white/30 hover:bg-neutral/30 dark:hover:bg-surface/30 transition-all duration-300"
 >
 <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-text-primary text-text-primary" />
 <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-text-primary text-text-primary" />
 <span className="sr-only">Toggle theme</span>
 </Button>
 );
}