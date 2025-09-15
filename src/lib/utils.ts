import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


/**
 * Merge class names with Tailwind CSS and clsx to support conditional
 * @param classes
 */
export function cn(...classes: ClassValue[]) {
    return twMerge(clsx(...classes));
}
