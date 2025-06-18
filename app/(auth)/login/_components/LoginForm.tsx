"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader2, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function LoginForm() {
    const router = useRouter();
    const [githubPending, startGithubTransition] = useTransition();
    const [emailPending, startEmailTransition] = useTransition();
    const [email, setEmail] = useState("");

    async function handleGithubLogin() {
        startGithubTransition(async () => {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed in with Github, you will be redirected...");
                    },
                    onError: (error) => {
                        toast.error("Failed to sign in with Github, please try again.");
                    }
                }
            });
        })
    }

    async function handleEmailLogin() {
        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        startEmailTransition(async () => {
            await authClient.emailOtp.sendVerificationOtp({
                email,
                type: "sign-in",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Verification email sent, please check your email.");
                        router.push(`/verify-email?email=${email}`);
                    },
                    onError: (error) => {
                        toast.error("Failed to send verification email, please try again.");
                    }
                }
            });
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Welcome back!</CardTitle>
                <CardDescription>
                    Login with your Github or Email Account
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Button disabled={githubPending} className="w-full" variant="outline" onClick={handleGithubLogin}>
                    {githubPending ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <GithubIcon className="size-4" />
                            Sign in with Github
                        </>
                    )}
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <Button className="w-full" onClick={handleEmailLogin} disabled={emailPending}>
                        {emailPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                <span>Sending verification email...</span>
                            </>
                        ) : (
                            <>
                                <MailIcon className="size-4" />
                                Continue with Email
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}