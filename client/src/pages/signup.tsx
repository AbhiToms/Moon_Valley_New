import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft, Phone, Check } from "lucide-react";
import AuthSlideToggle from "@/components/auth-slide-toggle";
import { usePageTransition } from "@/hooks/use-page-transition";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";

const signupSchema = z.object({
    firstName: z.string()
        .min(2, "First name must be at least 2 characters")
        .max(20, "First name must be less than 20 characters")
        .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
    lastName: z.string()
        .min(1, "Last name must be at least 1 character")
        .max(25, "Last name must be less than 25 characters")
        .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    phone: z.string()
        .min(1, "Phone number is required")
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { registerMutation, user } = useAuth();
    const [password, setPassword] = useState('');
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const { toast } = useToast();
    const [, setLocation] = useLocation();
    const { isTransitioning, navigateWithTransition } = usePageTransition();

    // Phone number formatting function
    const formatPhoneNumber = useCallback((value: string) => {
        // Remove all non-digit characters and limit to 10 digits
        return value.replace(/\D/g, '').slice(0, 10);
    }, []);

    // Password validation
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

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

    useEffect(() => {
        if (user) {
            setLocation("/dashboard");
        }
    }, [user, setLocation]);

    const onSubmit = async (data: SignupFormData) => {
        const { confirmPassword, ...registrationData } = data;
        registerMutation.mutate(registrationData);
    };

    const handleSlideToggle = () => {
        navigateWithTransition('/login');
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
        const isRightSwipe = distance < -minSwipeDistance;

        if (isRightSwipe) {
            navigateWithTransition('/login');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-surface to-neutral dark:from-bg-primary dark:to-bg-secondary flex items-center justify-center p-6">
            <div className={`w-full max-w-md transition-all duration-300 ease-out ${isTransitioning
                    ? 'opacity-0 transform scale-95 translate-y-4'
                    : 'opacity-100 transform scale-100 translate-y-0'
                }`}>
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center text-primary dark:text-tropical hover:text-primary/80 dark:hover:text-tropical/80 mb-6 transition-colors">
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                </Link>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-block bg-primary/10 dark:bg-tropical/20 rounded-full px-4 py-1 mb-4">
                        <span className="text-primary dark:text-tropical font-semibold text-xs">JOIN US</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-poppins font-bold text-primary dark:text-text-primary mb-3">
                        Create Your <span className="text-tropical">Account</span>
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-text-secondary mb-4">
                        Join Moon Valley Resort and start planning your mountain adventure
                    </p>

                    {/* Auth Slide Toggle */}
                    <AuthSlideToggle currentView="signup" className="mb-2" onToggle={handleSlideToggle} />
                    <p className="text-xs text-gray-500 dark:text-text-secondary/70">
                        Already have an account? Slide to sign in
                    </p>
                </div>

                {/* Signup Form */}
                <Card className="bg-white dark:bg-bg-secondary rounded-2xl card-shadow border-0 dark:border dark:border-mist/20">
                    <CardContent
                        className="p-6"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* First Name Field */}
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary dark:text-text-primary font-semibold flex items-center">
                                                <User className="mr-2" size={16} />
                                                First Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your first name"
                                                    maxLength={20}
                                                    className="bg-white dark:bg-bg-primary text-gray-800 dark:text-text-primary border-2 border-neutral/30 dark:border-mist/30 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl h-10 shadow-sm hover:shadow-md transition-all duration-300"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Last Name Field */}
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary dark:text-text-primary font-semibold flex items-center">
                                                <User className="mr-2" size={16} />
                                                Last Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your last name"
                                                    maxLength={25}
                                                    className="bg-white dark:bg-bg-primary text-gray-800 dark:text-text-primary border-2 border-neutral/30 dark:border-mist/30 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl h-10 shadow-sm hover:shadow-md transition-all duration-300"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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

                                {/* Phone Field */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary dark:text-text-primary font-semibold flex items-center">
                                                <Phone className="mr-2" size={16} />
                                                Phone Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="tel"
                                                    placeholder="Enter your phone number"
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        const formatted = formatPhoneNumber(e.target.value);
                                                        field.onChange(formatted);
                                                    }}
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
                                                        placeholder="Create a password"
                                                        value={field.value || ''}
                                                        onChange={(e) => {
                                                            field.onChange(e.target.value);
                                                            setPassword(e.target.value);
                                                        }}
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
                                            {password && (
                                                <div className="mt-2 space-y-1">
                                                    <div className="flex items-center space-x-2">
                                                        <div className={`w-3 h-3 rounded-full flex items-center justify-center ${minLength ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                            {minLength && <Check size={8} className="text-white" />}
                                                        </div>
                                                        <span className="text-xs">At least 8 characters</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <div className={`w-3 h-3 rounded-full flex items-center justify-center ${hasUppercase ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                            {hasUppercase && <Check size={8} className="text-white" />}
                                                        </div>
                                                        <span className="text-xs">One uppercase letter</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <div className={`w-3 h-3 rounded-full flex items-center justify-center ${hasLowercase ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                            {hasLowercase && <Check size={8} className="text-white" />}
                                                        </div>
                                                        <span className="text-xs">One lowercase letter</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <div className={`w-3 h-3 rounded-full flex items-center justify-center ${hasNumber ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                            {hasNumber && <Check size={8} className="text-white" />}
                                                        </div>
                                                        <span className="text-xs">One number</span>
                                                    </div>
                                                </div>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password Field */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-primary dark:text-text-primary font-semibold flex items-center">
                                                <Lock className="mr-2" size={16} />
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        {...field}
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm your password"
                                                        className="bg-white dark:bg-bg-primary text-gray-800 dark:text-text-primary border-2 border-neutral/30 dark:border-mist/30 focus:border-tropical focus:ring-2 focus:ring-tropical/20 dark:focus:border-tropical dark:focus:ring-tropical/20 rounded-xl h-10 shadow-sm hover:shadow-md transition-all duration-300 pr-12"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                                                    >
                                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={registerMutation.isPending}
                                    className="w-full bg-gradient-to-r from-primary to-tropical text-white hover:opacity-90 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 font-semibold py-2 text-base transform hover:scale-[1.02] active:scale-[0.98] h-10"
                                >
                                    {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                                </Button>


                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}