import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PriceAmount } from "@/lib/price/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRub(amount: number): string {
  return new Intl.NumberFormat("ru-RU").format(amount) + " ₽";
}

export function formatPrice(price: PriceAmount): string {
  return (price.from ? "от " : "") + formatRub(price.amount);
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("7")) {
    return `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
  }
  return phone;
}

export function slugItemId(categoryId: string, name: string): string {
  return `${categoryId}::${name}`;
}
