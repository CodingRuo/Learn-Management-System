import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/logo.png";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex flex-col min-h-svh items-center justify-center">
            <Link href="/" className={buttonVariants({
                variant: "outline",
                className: "absolute left-4 top-4"
            })}>
                <ArrowLeftIcon className="size-4" />
                <span className="text-sm">Back to Home</span>
            </Link>
            <div className="flex w-full max-w-sm flex-col gap-6">
                {children}

                <div className="text-balance text-center text-xs text-muted-foreground">
                    By clicking continue, you agree to our <span className="hover:text-primary hover:underline cursor-pointer">Terms of service</span> and <span className="hover:text-primary hover:underline cursor-pointer">Privacy Policy</span>.
                </div>
            </div>
            <div className="absolute bottom-6 right-6">
                <Link href="https://www.codingruo.dev" target="_blank" className="flex items-center gap-2 self-center font-medium">
                    <Image src={Logo} alt="CodingRuo Logo" className="invert" width={100} height={100} />
                </Link>
            </div>
        </div>
    );
}
