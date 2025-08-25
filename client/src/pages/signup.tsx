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
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft, Phone } from "lucide-react";

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data in localStorage (replace with proper auth)
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        name: `${data.firstName} ${data.lastName}`
      }));
      
      toast({
        title: "Account Created!",
        description: "Welcome to Moon Valley Resort. You can now book your stay.",
      });
      
      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
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
            <span className="text-primary dark:text-tropical font-semibold text-sm">JOIN US</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-primary dark:text-text-primary mb-4">
            Create Your <span className="text-tropical">Account</span>
          </h1>
          <p className="text-gray-600 dark:text-text-secondary">
            Join Moon Valley Resort and start planning your mountain adventure
          </p>
        </div>

        {/* Signup Form */}
        <Card className="bg-white dark:bg-bg-secondary rounded-2xl card-shadow border-0 dark:border dark:border-mist/20">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary dark:text-text-primary">First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <Input 
                              {...field}
                              placeholder="First name"
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary dark:text-text-primary">Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <Input 
                              {...field}
                              placeholder="Last name"
                              className="pl-10 bg-white dark:bg-bg-primary border-gray-300 dark:border-mist/30 focus:border-primary dark:focus:border-tropical focus:ring-primary dark:focus:ring-tropical dark:text-text-primary"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary dark:text-text-primary">Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <Input 
                            {...field}
                            type="tel"
                            placeholder="Enter your phone number"
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
                            placeholder="Create a password"
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary dark:text-text-primary">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <Input 
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10 bg-white dark:bg-bg-primary border-gray-300 dark:border-mist/30 focus:border-primary dark:focus:border-tropical focus:ring-primary dark:focus:ring-tropical dark:text-text-primary"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" 
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-text-secondary">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary dark:text-tropical hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary dark:text-tropical hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-lg transition-all duration-300 hover:shadow-lg font-semibold py-3"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="text-center">
                  <p className="text-gray-600 dark:text-text-secondary">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary dark:text-tropical hover:underline font-semibold">
                      Sign in here
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
