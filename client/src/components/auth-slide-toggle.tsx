import { useLocation } from "wouter";

interface AuthSlideToggleProps {
    currentView: 'login' | 'signup';
    className?: string;
    onToggle?: () => void;
}

export default function AuthSlideToggle({ currentView, className = "", onToggle }: AuthSlideToggleProps) {
    const [, setLocation] = useLocation();

    const handleToggle = () => {
        // Call the onToggle callback if provided (for page transitions)
        if (onToggle) {
            onToggle();
        } else {
            // Default behavior
            if (currentView === 'login') {
                setLocation('/signup');
            } else {
                setLocation('/login');
            }
        }
    };

    return (
        <div className={`flex items-center justify-center space-x-4 ${className}`}>
            <span className={`text-sm font-medium transition-all duration-500 ease-out transform ${
                currentView === 'login' ? 'text-primary dark:text-tropical scale-105' : 'text-muted-foreground scale-100'
            }`}>
                Sign In
            </span>
            <div
                className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer transition-all duration-400 ease-out hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105 active:scale-95"
                onClick={handleToggle}
            >
                <div className={`absolute top-1 w-5 h-5 bg-gradient-to-r from-primary to-tropical rounded-full shadow-lg transition-all duration-500 ease-out hover:shadow-xl ${
                    currentView === 'login' ? 'translate-x-1' : 'translate-x-7'
                }`} />
            </div>
            <span className={`text-sm font-medium transition-all duration-500 ease-out transform ${
                currentView === 'signup' ? 'text-primary dark:text-tropical scale-105' : 'text-muted-foreground scale-100'
            }`}>
                Sign Up
            </span>
        </div>
    );
}