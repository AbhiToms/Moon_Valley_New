import { useState } from "react";
import { useLocation } from "wouter";

export function usePageTransition() {
    const [, setLocation] = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const navigateWithTransition = (path: string) => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        
        // Start transition animation
        setTimeout(() => {
            setLocation(path);
            
            // Reset transition state after navigation
            setTimeout(() => {
                setIsTransitioning(false);
            }, 100);
        }, 200);
    };

    return {
        isTransitioning,
        navigateWithTransition
    };
}