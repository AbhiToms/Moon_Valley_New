import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { lazy, Suspense } from "react";

import Home from "@/pages/home";

// Lazy load pages for better performance 
const TermsAndConditions = lazy(() => import("@/pages/terms-and-conditions"));
const CookiePolicy = lazy(() => import("@/pages/cookie-policy"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading component removed in favor of page-specific loading or global theme-consistent loader
const PageLoader = () => null;

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/terms-and-conditions" component={TermsAndConditions} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="moon-valley-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
