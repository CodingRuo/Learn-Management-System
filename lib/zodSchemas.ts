import { z } from "zod";
import { CourseLevel, CourseStatus } from "./generated/prisma";

export const courseCategories = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cybersecurity",
    "Blockchain",
    "Game Development",
    "DevOps",
    "Cloud Computing",
    "Database Management",
    "Software Engineering",
    "Project Management",
    "Other",
] as const;

export const courseSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100, { message: "Title must be less than 100 characters" }),
    description: z.string().min(3, { message: "Description must be at least 3 characters" }),
    fileKey: z.string().min(1, { message: "File key is required" }),
    price: z.coerce.number().min(1, { message: "Price must be a positive number" }),
    duration: z.coerce.number().min(1, { message: "Duration must be at least 1 hour" }).max(500, { message: "Duration must be less than 500 hours" }),
    level: z.nativeEnum(CourseLevel, { message: "Level is required" }),
    category: z.enum(courseCategories, { message: "Category is required" }),
    smallDescription: z.string().min(3, { message: "Small description must be at least 3 characters" }).max(200, { message: "Small description must be less than 200 characters" }),
    slug: z.string().min(3),
    status: z.nativeEnum(CourseStatus),
})

export type CourseSchema = z.infer<typeof courseSchema>;