import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BookOpenText } from "lucide-react";
import Link from "next/link";

interface featureProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const features: featureProps[] = [
    {
        title: "Interactive Learning",
        description: "Engage with our interactive learning platform, where you can watch videos, take quizzes, and complete assignments.",
        icon: <BookOpen />
    },
    {
        title: "Expert Instructors",
        description: "Learn from industry experts and experienced educators who are passionate about sharing their knowledge.",
        icon: <BookOpenText />
    },
    {
        title: "Flexible Learning",
        description: "Learn at your own pace with our flexible learning schedule. Access courses on your schedule.",
        icon: <BookOpenText />
    },
    {
        title: "Community Support",
        description: "Connect with a community of learners and educators who are passionate about sharing their knowledge.",
        icon: <BookOpen />
    }
]

export default function HomePage() {
    return (
        <>
            <section className="relative py-20">
                <div className="flex flex-col items-center text-center space-y-8">
                    <Badge variant="outline">
                        The Future of Online Education
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Elevate Your Learning Experience
                    </h1>
                    <p className="max-w-[700px] text-muted-foreground">Discover a new way to learn with our modern, interactive learning management system. Access high-quality courses anytime, anywhere.</p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link href="/courses" className={buttonVariants({ variant: "default", size: "lg" })}>
                            Explore Courses
                        </Link>
                        <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-col items-center">
                            <div className="mb-4">{feature.icon}</div>
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </>
    )
}