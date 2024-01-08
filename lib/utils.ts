import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LoginError {
  [key: string]: string[];
}

export const handleErrors = (errors: LoginError): void => {
  Object.entries(errors).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((errorMessage) => {
        toast.error(`${key}: ${errorMessage}`);
      });
    }
  });
};
