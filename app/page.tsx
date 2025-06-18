"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    async function handleSignOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    toast.success("Signed out successfully");
                },
            }
        });
    }

    return (
        <div>
            <h1>Home</h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
}
