"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignOut() {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    toast.success("Logged out successfully");
                },
                onError: () => {
                    toast.error("Failed to logout");
                },
            },
        });
    };

    return {
        handleLogout,
    };
}
