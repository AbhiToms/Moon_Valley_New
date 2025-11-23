import { useEffect, useState } from "react";

export function ThemeTransitionOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleThemeTransition = () => {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 350);
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
        opacity: isVisible ? 0.7 : 0,
        transition: isVisible ? "opacity 0.3s ease-in" : "opacity 0.3s ease-out",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
