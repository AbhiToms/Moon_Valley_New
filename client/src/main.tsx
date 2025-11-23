import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(<App />);

// Lazy load performance monitor after render
if (process.env.NODE_ENV === 'development') {
  import("./components/performance-monitor").then((module) => {
    const PerformanceMonitor = module.default;
    const perfRoot = document.createElement('div');
    document.body.appendChild(perfRoot);
    createRoot(perfRoot).render(<PerformanceMonitor />);
  });
}
