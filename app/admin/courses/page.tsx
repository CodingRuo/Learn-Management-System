import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
    return (
       <>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Your Courses</h1>
            <Link href="/admin/courses/create">
                <Button>
                    <PlusIcon className="w-4 h-4" />
                    Create Course
                </Button>
            </Link>
        </div>
        <div>
            Here you will see all of the courses
        </div>
       </>
    )
}