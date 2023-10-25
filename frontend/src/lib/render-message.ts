import { toast } from "react-hot-toast";

export function renderMessage(message: string, type: string) {
  if (type === "success") toast.success(message);
  if (type === "error") toast.error(message);
  if (type === "loading") toast.loading(message);
  if (type === "info") toast(message);
  if (!type) toast(message);
}