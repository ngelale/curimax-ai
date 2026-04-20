"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

type State = "idle" | "pending" | "success" | "error";

function VerifyEmailContent() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  const email = sp.get("email") || "";
  const [state, setState] = useState<State>(token ? "pending" : "idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    async function verify() {
      if (!token) return;
      setState("pending");
      try {
        const res = await fetch(`/api/verify-email?token=${encodeURIComponent(token)}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          const msg = data?.error || "Invalid or expired verification link";
          if (!ignore) {
            setMessage(msg);
            setState("error");
          }
          return;
        }
        if (!ignore) {
          setState("success");
        }
      } catch (e) {
        if (!ignore) {
          setMessage("Network error");
          setState("error");
        }
      }
    }
    verify();
    return () => {
      ignore = true;
    };
  }, [token]);

  const content = useMemo(() => {
    if (!token) {
      return (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              {email ? (
                <>We sent a verification link to <span className="font-medium">{email}</span>.</>
              ) : (
                <>We sent a verification link to your email.</>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            <p>Please click the link in the email to verify your account.</p>
            <p className="mt-4">
              Already verified? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
            </p>
          </CardContent>
        </>
      );
    }

    if (state === "pending") {
      return (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Verifying your email...</CardTitle>
            <CardDescription>Hold on while we confirm your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid place-items-center gap-4 py-8">
            <Loader2 className="size-8 animate-spin text-primary" />
          </CardContent>
        </>
      );
    }

    if (state === "success") {
      return (
        <>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <CheckCircle className="size-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Email verified!</CardTitle>
            <CardDescription>You can now access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="grid place-items-center py-4">
            <Button asChild className="w-full max-w-[260px]">
              <Link href="/projects">Continue to dashboard</Link>
            </Button>
          </CardContent>
        </>
      );
    }

    return (
      <>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <XCircle className="size-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Invalid or expired verification link</CardTitle>
          <CardDescription>{message || "Please request a new verification email."}</CardDescription>
        </CardHeader>
        <CardContent className="grid place-items-center gap-3 py-4">
          <Button
            className="w-full max-w-[260px]"
            onClick={async () => {
              try {
                if (!email) {
                  toast.error("No email available to resend");
                  return;
                }
                const res = await fetch("/api/resend-verification", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });
                if (!res.ok) throw new Error();
                toast.success("Verification email sent");
              } catch (e) {
                toast.error("Failed to resend verification email");
              }
            }}
          >
            <Send className="mr-2 size-4" /> Resend verification email
          </Button>
        </CardContent>
      </>
    );
  }, [token, state, message, email]);

  return <>{content}</>;
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[calc(100dvh)] grid place-items-center px-6 py-12">
      <Card className="w-full max-w-[480px] border-0 shadow-xl">
        <Suspense
          fallback={
            <CardContent className="grid place-items-center gap-4 py-8">
              <Loader2 className="size-8 animate-spin text-primary" />
            </CardContent>
          }
        >
          <VerifyEmailContent />
        </Suspense>
      </Card>
    </div>
  );
}
