"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Sparkles, Loader2, Mail, Lock, User, Building2, Briefcase, ArrowRight, CheckCircle2, Zap, Users, Rocket } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Progress } from "../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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

interface RegisterForm {
  email: string;
  password: string;
  name: string;
  organizationName: string;
  organizationType: "university" | "corporate" | "government" | "consultant" | "edtech" | "";
  role?: string;
  terms: boolean;
}

function passwordStrength(pw: string) {
  let score = 0;
  const hasLength = pw.length >= 8;
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  if (hasLength) score += 25;
  if (hasLower && hasUpper) score += 25;
  if (hasNumber) score += 25;
  if (hasSpecial) score += 25;
  let label: "Weak" | "Medium" | "Strong" = "Weak";
  if (score >= 75) label = "Strong";
  else if (score >= 50) label = "Medium";
  return { score, label };
}

const orgTypeDescriptions: Record<string, string> = {
  university: "Academic institution",
  corporate: "Business organization",
  government: "Public sector",
  consultant: "Independent consultant",
  edtech: "Educational technology",
};

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"account" | "organization">("account");
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());

  const form = useForm<RegisterForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      organizationName: "",
      organizationType: "",
      role: "",
      terms: false,
    },
  });

  const password = form.watch("password");
  const organizationType = form.watch("organizationType");
  const email = form.watch("email");
  const name = form.watch("name");
  const strength = useMemo(() => passwordStrength(password || ""), [password]);

  // Update completed fields
  useMemo(() => {
    const fields = new Set<string>();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.add("email");
    if (name && name.length >= 2) fields.add("name");
    if (password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) fields.add("password");
    setCompletedFields(fields);
  }, [email, name, password]);

  const onSubmit = async (values: RegisterForm) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message: string = data?.error || "Registration failed";
        if (message.toLowerCase().includes("email")) {
          form.setError("email", { type: "server", message });
        }
        toast.error(message);
        return;
      }

      toast.success("Account created. Please verify your email.");
      const params = new URLSearchParams();
      params.set("email", values.email);
      router.push(`/verify-email?${params.toString()}`);
    } catch (e) {
      toast.error("Server error. Please try again.");
    }
  };

  const canProceed = step === "account" && completedFields.size === 3;

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
            Start Your Learning Revolution
          </h1>
          <p className="text-lg text-white/80 mb-12 leading-relaxed">
            Join thousands of educators and learners transforming education with adaptive, personalized curriculum solutions.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quick Setup</h3>
                <p className="text-white/70 text-sm">Get started in minutes with our intuitive onboarding</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Collaborative Tools</h3>
                <p className="text-white/70 text-sm">Work seamlessly with your team and students</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Powerful Analytics</h3>
                <p className="text-white/70 text-sm">Data-driven insights to improve learning outcomes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-white/60">
          <p>© 2026 Curimax. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex flex-col justify-center items-center px-4 py-8 lg:py-12 lg:px-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen lg:min-h-auto">
        <Card className="w-full max-w-[480px] border border-slate-100 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader className="text-center lg:text-left pb-8 pt-8 px-8 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#0052A3] flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-slate-900">Curimax</span>
            </div>
            <CardTitle className="text-4xl font-bold tracking-tight text-slate-900">Join Curimax</CardTitle>
            <CardDescription className="text-base mt-3 text-slate-600">
              {step === "account" 
                ? "Create your account to get started" 
                : "Tell us about your organization"}
            </CardDescription>

            {/* Step indicator */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${step === "account" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                <User className="w-3.5 h-3.5" />
                Account
              </div>
              <div className={`h-0.5 w-6 ${step === "account" ? "bg-slate-300" : "bg-blue-500"}`}></div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${step === "organization" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                <Building2 className="w-3.5 h-3.5" />
                Organization
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === "account" && (
                  <>
                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Please enter a valid email",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <FormItem className="relative">
                          <FormLabel className="flex items-center gap-1 text-sm font-semibold">
                            Email Address
                            {completedFields.has("email") && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                className={`pl-10 transition-all duration-200 ${
                                  fieldState.error
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : completedFields.has("email")
                                    ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                                    : "focus:border-blue-500 focus:ring-blue-200"
                                }`}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="flex items-center gap-1 text-xs mt-1" />
                        </FormItem>
                      )}
                    />

                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{
                        required: "Name is required",
                        minLength: { value: 2, message: "Name must be 2-100 characters" },
                        maxLength: { value: 100, message: "Name must be 2-100 characters" },
                      }}
                      render={({ field, fieldState }) => (
                        <FormItem className="relative">
                          <FormLabel className="flex items-center gap-1 text-sm font-semibold">
                            Full Name
                            {completedFields.has("name") && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <Input
                                type="text"
                                placeholder="Your full name"
                                className={`pl-10 transition-all duration-200 ${
                                  fieldState.error
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : completedFields.has("name")
                                    ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                                    : "focus:border-blue-500 focus:ring-blue-200"
                                }`}
                                {...field}
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
                        required: "Password must be 8+ characters with uppercase, lowercase, number, special character",
                        validate: (value) =>
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ||
                          "Password must be 8+ characters with uppercase, lowercase, number, special character",
                      }}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1 text-sm font-semibold">
                            Password
                            {completedFields.has("password") && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <Input
                                type="password"
                                placeholder="Create a strong password"
                                className={`pl-10 transition-all duration-200 ${
                                  fieldState.error
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : completedFields.has("password")
                                    ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                                    : "focus:border-blue-500 focus:ring-blue-200"
                                }`}
                                {...field}
                              />
                            </div>
                          </FormControl>

                          {/* Password Strength Indicator */}
                          <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-slate-700">Password Strength</span>
                              <span
                                className={`text-xs font-bold ${
                                  strength.label === "Strong"
                                    ? "text-green-600"
                                    : strength.label === "Medium"
                                    ? "text-amber-600"
                                    : "text-red-600"
                                }`}
                              >
                                {strength.label}
                              </span>
                            </div>
                            <Progress 
                              value={strength.score} 
                              className="h-2 bg-slate-200"
                            />
                            <div className="flex gap-2 mt-2 text-xs">
                              <div className={`flex items-center gap-1 ${password.length >= 8 ? "text-green-600" : "text-slate-400"}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${password.length >= 8 ? "bg-green-600" : "bg-slate-300"}`}></div>
                                8+ chars
                              </div>
                              <div className={`flex items-center gap-1 ${/[a-z]/.test(password) && /[A-Z]/.test(password) ? "text-green-600" : "text-slate-400"}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(password) && /[A-Z]/.test(password) ? "bg-green-600" : "bg-slate-300"}`}></div>
                                Upper & lower
                              </div>
                              <div className={`flex items-center gap-1 ${/\d/.test(password) ? "text-green-600" : "text-slate-400"}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${/\d/.test(password) ? "bg-green-600" : "bg-slate-300"}`}></div>
                                Number
                              </div>
                              <div className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(password) ? "text-green-600" : "text-slate-400"}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${/[^A-Za-z0-9]/.test(password) ? "bg-green-600" : "bg-slate-300"}`}></div>
                                Special
                              </div>
                            </div>
                          </div>
                          <FormMessage className="text-xs mt-2" />
                        </FormItem>
                      )}
                    />

                    {/* Proceed Button */}
                    <Button
                      type="button"
                      onClick={() => setStep("organization")}
                      disabled={!canProceed}
                      className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed gap-2 h-12 rounded-lg font-semibold text-base"
                    >
                      Continue to Organization
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {step === "organization" && (
                  <>
                    {/* Organization Name */}
                    <FormField
                      control={form.control}
                      name="organizationName"
                      rules={{ required: "Organization name is required" }}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Organization Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <Input
                                type="text"
                                placeholder="Company or institution"
                                className="pl-10 transition-all duration-200 focus:border-blue-500 focus:ring-blue-200"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs mt-1" />
                        </FormItem>
                      )}
                    />

                    {/* Organization Type */}
                    <FormField
                      control={form.control}
                      name="organizationType"
                      rules={{ required: "Organization type is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Organization Type</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={(v) => field.onChange(v)}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:border-blue-500 focus:ring-blue-200">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="university">🎓 University</SelectItem>
                              <SelectItem value="corporate">🏢 Corporate</SelectItem>
                              <SelectItem value="government">🏛️ Government</SelectItem>
                              <SelectItem value="consultant">👤 Consultant</SelectItem>
                              <SelectItem value="edtech">🚀 EdTech</SelectItem>
                            </SelectContent>
                          </Select>
                          {organizationType && (
                            <p className="text-xs text-slate-600 mt-1 animate-in fade-in">
                              {orgTypeDescriptions[organizationType]}
                            </p>
                          )}
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Role Field - Dynamic */}
                    {organizationType && (
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="animate-in slide-in-from-top-2 duration-300">
                            <FormLabel className="text-sm font-semibold">Your Role (optional)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                  type="text"
                                  placeholder="e.g., Curriculum Manager, HR Lead"
                                  className="pl-10 transition-all duration-200 focus:border-blue-500 focus:ring-blue-200"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Terms & Conditions */}
                    <FormField
                      control={form.control}
                      name="terms"
                      rules={{ required: "You must accept the Terms & Privacy" }}
                      render={({ field, fieldState }) => (
                        <FormItem className="mt-6">
                          <div className="flex items-start gap-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(v) => field.onChange(!!v)}
                                className={fieldState.error ? "border-red-500" : ""}
                              />
                            </FormControl>
                            <div className="grid gap-1 text-sm flex-1">
                              <FormLabel className="m-0 font-medium text-slate-900">
                                I agree to the Terms & Privacy
                              </FormLabel>
                              <p className="text-slate-600 text-xs leading-relaxed">
                                By creating an account, you agree to our{" "}
                                <Link href="/terms" className="text-blue-600 hover:underline font-medium">
                                  Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                                  Privacy Policy
                                </Link>.
                              </p>
                            </div>
                          </div>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 gap-2 h-12 rounded-lg font-semibold text-base"
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>

                    {/* Back Button */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("account")}
                      className="w-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200 font-medium h-11 rounded-lg transition-all duration-200"
                    >
                      Back to account details
                    </Button>
                  </>
                )}

                {/* Sign In Link */}
                <div className="pt-6 mt-6 border-t border-slate-200">
                  <p className="text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                      Sign in
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
