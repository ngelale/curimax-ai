"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Sparkles, Eye, EyeOff, Loader2, Zap, Users, Rocket } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginForm>({ mode: "onBlur" });

  const onSubmit = async (values: LoginForm) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message = data?.error || "Invalid email or password";
        toast.error("Invalid credentials", { description: message });
        form.setError("root", { type: "server", message });
        return;
      }

      toast.success("Signed in successfully");
      await new Promise(resolve => setTimeout(resolve, 500));
      router.push("/projects");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Brand & Visual */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#0066CC] via-[#0052A3] to-[#003D7A] p-12 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xl font-semibold">Curimax</span>
          </div>

          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Empower Your Learning Journey
          </h1>
          <p className="text-lg text-white/80 mb-12 leading-relaxed">
            Access personalized curriculum, track your progress, and achieve your educational goals with our comprehensive platform.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Smart Learning</h3>
                <p className="text-white/70 text-sm">Adaptive curriculum that adjusts to your pace</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Community Support</h3>
                <p className="text-white/70 text-sm">Learn alongside thousands of students</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Real Progress</h3>
                <p className="text-white/70 text-sm">Track achievements and earn certifications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-white/60">
          <p>© 2026 Curimax. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center px-6 py-12 lg:p-12 bg-background">
        <Card className="w-full max-w-[450px] border-0 shadow-lg">
          <CardHeader className="text-center lg:text-left pb-6">
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#0052A3] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold">Curimax</span>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-base mt-2">Sign in to your account to continue learning</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type="email" 
                            placeholder="you@example.com" 
                            {...field}
                            className={`transition-colors ${fieldState.error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            autoComplete="email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  rules={{ 
                    required: "Password is required",
                    minLength: { value: 1, message: "Password is required" }
                  }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-2">
                        <FormLabel className="text-sm font-medium">Password</FormLabel>
                        <Link href="/reset-password" className="text-xs text-primary hover:underline font-medium transition-colors">
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className={`pr-10 transition-colors ${fieldState.error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                            autoComplete="current-password"
                          />
                        </FormControl>
                        <button
                          type="button"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />

                {/* Sign In Button */}
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                  className="w-full h-11 text-base font-semibold mt-6 transition-all duration-200 hover:shadow-md"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-3 text-xs text-muted-foreground font-medium">New to Curimax?</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <Link href="/register" className="block">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full h-11 text-base font-semibold transition-all duration-200 hover:bg-muted"
                  >
                    Create an account
                  </Button>
                </Link>

                {/* Help Text */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  By signing in, you agree to our{" "}
                  <Link href="#" className="text-primary hover:underline font-medium">
                    Terms of Service
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
