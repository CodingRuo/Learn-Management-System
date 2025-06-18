"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequest() {
    const [otp, setOtp] = useState("");
    const [emailPending, startEmailTransition] = useTransition();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") as string;
    const router = useRouter();

    async function handleVerifyEmail() {

        if (!email || !otp) {
            toast.error("Please enter the verification code");
            return;
        }

        startEmailTransition(async () => {
            await authClient.signIn.emailOtp({
                email,
                otp,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Email verified successfully");
                        router.push("/");
                    },
                    onError: (error) => {
                        toast.error("Invalid verification code");
                    }
                }
            });
        });
    }

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Verify your email</CardTitle>
                <CardDescription>
                    We have sent a verification code to your email. Please check your email and enter the code to continue.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <InputOTP maxLength={6} className="gap-2" value={otp} onChange={(value) => setOtp(value)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email</p>
                </div>
                <Button onClick={handleVerifyEmail} className="w-full" disabled={emailPending || otp.length !== 6}>
                    {emailPending ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>Verifying email...</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle className="size-4" />
                            <span>Verify Email</span>
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}