import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn = className merge utility
// clsx handles conditional classes: cn("p-2", isActive && "bg-blue-500")
// twMerge resolves Tailwind conflicts: cn("p-2", "p-4") → "p-4"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
