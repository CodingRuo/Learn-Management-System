import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
    return (
        <div className="text-center">
            <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
                <CloudUploadIcon
                    className={cn(
                        "size-6 text-muted-foreground",
                        isDragActive && "text-primary",
                    )}
                />
            </div>
            <p className="text-base font-semibold text-foreground">
                Drop your files here or{" "}
                <span className="text-primary font-bold cursor-pointer">
                    click to upload
                </span>
            </p>
            <Button
                type="button"
                variant="outline"
                className="mt-4 cursor-pointer"
            >
                Select File
            </Button>
        </div>
    );
}

export function RenderErrorState() {
    return (
        <div className="text-center">
            <div className="flex items-center mx-auto justify-center size-12 rounded-full mb-4 bg-destructive/30">
                <ImageIcon className={cn("size-6 text-destructive")} />
            </div>
            <p className="text-base font-semibold">Upload Failed</p>
            <p className="text-xs mt-1 text-muted-foreground">
                Something went wrong
            </p>
            <Button
                type="button"
                variant="outline"
                className="mt-4 cursor-pointer"
            >
                Try Again
            </Button>
        </div>
    );
}

export function RenderUploadedState({ previewUrl }: { previewUrl: string }) {
    return (
        <div className="text-center">
            <Image
                src={previewUrl}
                alt="Uploaded Image"
                className="object-contain p-2"
                fill
            />
            <Button
                variant="destructive"
                size="icon"
                className={cn("absolute top-4 right-4")}
            >
                <XIcon className="size-4" />
            </Button>
        </div>
    );
}

export function RenderUploadingState({
    progress,
    file,
}: {
    progress: number;
    file: File;
}) {
    return (
        <div className="text-center flex justify-center items-center flex-col">
            <p>{progress}</p>
            <p className="mt-2 text-sm font-medium text-foreground">
                Uploading...
            </p>
            <p className="mt-1 text-muted-foreground truncate max-w-xs">
                {file.name}
            </p>
        </div>
    );
}
