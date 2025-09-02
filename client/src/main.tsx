import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Only import performance monitor in development
const PerformanceMonitor = process.env.NODE_ENV === 'development' 
  ? (await import("./components/performance-monitor")).default 
  : null;

// Enable React concurrent features
const root = createRoot(document.getElementById("root")!);

root.render(
  <>
    <App />
    {PerformanceMonitor && <PerformanceMonitor />}
  </>
);
