"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

interface RequestForm { email: string }
interface ResetForm { password: string; confirm: string }

export function ResetPasswordClient() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1 state
  const requestForm = useForm<RequestForm>({ mode: "onChange" });
  const [requestSent, setRequestSent] = useState(false);

  // Step 2 state
  const resetForm = useForm<ResetForm>({ mode: "onChange" });
  const pw = resetForm.watch("password") || "";
  const strength = useMemo(() => passwordStrength(pw), [pw]);

  async function onRequestSubmit(data: RequestForm) {
    try {
      const res = await fetch("/api/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: "Failed to send reset link" }));
        toast.error(error.error || "Failed to send reset link");
        return;
      }

      setRequestSent(true);
      toast.success("Check your email for reset instructions");
    } catch (error) {
      console.error("Request error:", error);
      toast.error("An error occurred. Please try again.");
    }
  }

  async function onResetSubmit(data: ResetForm) {
    if (data.password !== data.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: "Reset failed" }));
        toast.error(error.error || "Reset failed");
        return;
      }

      toast.success("Password reset successfully. Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      console.error("Reset error:", error);
      toast.error("An error occurred. Please try again.");
    }
  }

  // Show reset form if token is present
  if (token) {
    return (
      <div className="min-h-[calc(100dvh)] grid place-items-center px-6 py-12">
        <Card className="w-full max-w-[480px] border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create a new password</CardTitle>
            <CardDescription>Enter and confirm your new password.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...resetForm}>
              <form
                onSubmit={resetForm.handleSubmit(onResetSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={resetForm.control}
                  name="password"
                  rules={{
                    required: "Password must be 8+ characters with uppercase, lowercase, number, special character",
                    validate: (value) =>
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ||
                      "Password must be 8+ characters with uppercase, lowercase, number, special character",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter a strong password"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute inset-y-0 right-0 pr-3 grid place-items-center text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <div className="mt-1 grid gap-1">
                        <Progress value={strength.score} />
                        <span
                          className={
                            strength.label === "Strong"
                              ? "text-green-600 text-xs"
                              : strength.label === "Medium"
                                ? "text-yellow-600 text-xs"
                                : "text-red-600 text-xs"
                          }
                        >
                          Strength: {strength.label}
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={resetForm.control}
                  name="confirm"
                  rules={{
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === resetForm.getValues("password") ||
                      "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter password"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          aria-label={
                            showConfirmPassword ? "Hide password" : "Show password"
                          }
                          onClick={() =>
                            setShowConfirmPassword((s) => !s)
                          }
                          className="absolute inset-y-0 right-0 pr-3 grid place-items-center text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={resetForm.formState.isSubmitting}
                  className="w-full mt-1"
                >
                  {resetForm.formState.isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    "Reset password"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show request form
  return (
    <div className="min-h-[calc(100dvh)] grid place-items-center px-6 py-12">
      <Card className="w-full max-w-[480px] border-0 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Reset your password</CardTitle>
          <CardDescription>
            Enter your email to receive a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {requestSent ? (
            <div className="text-center text-sm text-muted-foreground py-2">
              <p>Check your email for reset instructions.</p>
              <p className="mt-4">
                Remembered it?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          ) : (
            <Form {...requestForm}>
              <form
                onSubmit={requestForm.handleSubmit(onRequestSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={requestForm.control}
                  name="email"
                  rules={{
                    required: "Please enter a valid email",
                    validate: (v) =>
                      isValidEmail(v) || "Please enter a valid email",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={requestForm.formState.isSubmitting}
                  className="w-full"
                >
                  {requestForm.formState.isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
