import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind classes; on a conflict the last class wins (shadcn's cn helper).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
