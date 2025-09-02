import { useEffect } from 'react';

// Safe performance monitoring that doesn't expose sensitive data
export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development and when explicitly enabled
    const isDev = process.env.NODE_ENV === 'development';
    const isMonitoringEnabled = localStorage.getItem('enable-performance-monitoring') === 'true';

    if (!isDev || !isMonitoringEnabled) {
      return;
    }

    // Monitor Core Web Vitals (safe metrics only)
    const observeWebVitals = () => {
      if ('PerformanceObserver' in window) {
        try {
          // Largest Contentful Paint (LCP) - safe metric
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            // Only log the timing, no content details
            if (lastEntry.startTime > 0) {
              console.log(`[Performance] LCP: ${Math.round(lastEntry.startTime)}ms`);
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID) - safe metric
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.processingStart && entry.startTime) {
                const delay = entry.processingStart - entry.startTime;
                if (delay > 0) {
                  console.log(`[Performance] FID: ${Math.round(delay)}ms`);
                }
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS) - safe metric
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            if (clsValue > 0) {
              console.log(`[Performance] CLS: ${clsValue.toFixed(3)}`);
            }
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          // Silent fail - no logging of error details
        }
      }
    };

    // Monitor memory usage (safe aggregated data only)
    const monitorMemory = () => {
      if ('memory' in performance) {
        try {
          const memory = (performance as any).memory;
          const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
          const totalMB = Math.round(memory.totalJSHeapSize / 1048576);

          // Only log if memory usage is concerning (>100MB)
          if (usedMB > 100) {
            console.log(`[Performance] Memory: ${usedMB}MB used of ${totalMB}MB`);
          }
        } catch (error) {
          // Silent fail
        }
      }
    };

    observeWebVitals();
    const memoryInterval = setInterval(monitorMemory, 30000); // Check every 30 seconds

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  return null;
}

// To enable performance monitoring in development:
// localStorage.setItem('enable-performance-monitoring', 'true')