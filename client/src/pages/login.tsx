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
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data in localStorage (replace with proper auth)
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        email: data.email,
        name: 'Demo User'
      }));
      
      toast({
        title: "Login Successful!",
        description: "Welcome back to Moon Valley Resort.",
      });
      
      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-primary dark:text-tropical hover:text-primary/80 dark:hover:text-tropical/80 mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-6 py-2 mb-6">
            <span className="text-primary dark:text-tropical font-semibold text-sm">WELCOME BACK</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-primary dark:text-text-primary mb-4">
            Sign In to <span className="text-tropical">Moon Valley</span>
          </h1>
          <p className="text-gray-600 dark:text-text-secondary">
            Access your bookings and manage your mountain retreat experience
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-white dark:bg-bg-secondary rounded-2xl card-shadow border-0 dark:border dark:border-mist/20">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary dark:text-text-primary">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <Input 
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 bg-white dark:bg-bg-primary border-gray-300 dark:border-mist/30 focus:border-primary dark:focus:border-tropical focus:ring-primary dark:focus:ring-tropical dark:text-text-primary"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary dark:text-text-primary">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <Input 
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10 bg-white dark:bg-bg-primary border-gray-300 dark:border-mist/30 focus:border-primary dark:focus:border-tropical focus:ring-primary dark:focus:ring-tropical dark:text-text-primary"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="ml-2 text-sm text-gray-600 dark:text-text-secondary">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary dark:text-tropical hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold py-3"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>

                <div className="text-center">
                  <p className="text-gray-600 dark:text-text-secondary">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary dark:text-tropical hover:underline font-semibold">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
