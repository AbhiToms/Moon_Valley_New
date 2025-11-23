import { useEffect, useState } from "react";

export function ThemeTransitionOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleThemeTransition = () => {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 320);
      return () => clearTimeout(timer);
    };

    window.addEventListener("theme-transition-start", handleThemeTransition);
    return () => window.removeEventListener("theme-transition-start", handleThemeTransition);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "var(--background)",
        opacity: isVisible ? 0.65 : 0,
        transition: isVisible 
          ? "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)" 
          : "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
