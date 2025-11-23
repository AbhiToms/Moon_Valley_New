import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import AuthSlideToggle from "@/components/auth-slide-toggle";
import { usePageTransition } from "@/hooks/use-page-transition";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginMutation, user } = useAuth();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { isTransitioning, navigateWithTransition } = usePageTransition();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleSlideToggle = () => {
    navigateWithTransition('/signup');
  };

  // Handle swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;

    if (isLeftSwipe) {
      navigateWithTransition('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary">
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{ alignItems: 'center', paddingTop: '5vh', paddingBottom: '20vh' }}>
        <div className={`w-full max-w-md mx-auto transition-all duration-300 ease-out ${isTransitioning
            ? 'opacity-0 transform scale-95 translate-y-4'
            : 'opacity-100 transform scale-100 translate-y-0'
          }`}>
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-primary dark:text-tropical hover:text-primary/80 dark:hover:text-tropical/80 mb-4 sm:mb-6 transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Link>

          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-4 py-1 mb-3 sm:mb-4">
              <span className="text-primary dark:text-tropical font-semibold text-xs">WELCOME BACK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-primary dark:text-text-primary mb-2 sm:mb-3">
              Sign In to <span className="text-tropical">Moon Valley</span>
            </h1>
            <p className="text-sm text-gray-600 dark:text-text-secondary mb-3 sm:mb-4 px-2">
              Welcome back! Please sign in to your account to continue.
            </p>

            {/* Auth Slide Toggle */}
            <AuthSlideToggle currentView="login" className="mb-2" onToggle={handleSlideToggle} />
            <p className="text-xs text-gray-500 dark:text-text-secondary/70">
              New to Moon Valley? Slide to sign up
            </p>
          </div>

          {/* Login Form */}
          <Card className="bg-white dark:bg-bg-secondary rounded-2xl card-shadow border-0 dark:border dark:border-mist/20">
            <CardContent
              className="p-4 sm:p-6"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary dark:text-text-primary font-semibold flex items-center">
                          <Mail className="mr-2" size={16} />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email address"
                            className="bg-white dark:bg-bg-primary text-gray-800 dark:text-text-primary border-2 border-neutral/30 dark:border-mist/30 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl h-10 shadow-sm hover:shadow-md transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary dark:text-text-primary font-semibold flex items-center">
                          <Lock className="mr-2" size={16} />
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="bg-white dark:bg-bg-primary text-gray-800 dark:text-text-primary border-2 border-neutral/30 dark:border-mist/30 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl h-10 shadow-sm hover:shadow-md transition-all duration-300 pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 font-semibold py-2 text-base transform hover:scale-[1.02] active:scale-[0.98] h-10"
                  >
                    {loginMutation.isPending ? "Signing In..." : "Sign In"}
                  </Button>




                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}