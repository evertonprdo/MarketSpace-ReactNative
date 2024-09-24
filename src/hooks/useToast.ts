import { ToastContext } from "@/contexts/ToastContext";
import { useContext } from "react";

export function useToast() {
  const toast = useContext(ToastContext)

  if (!toast) {
    throw new Error('useToast must be wrapped in a <ToastProvider />');
  }

  return toast
}