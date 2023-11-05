import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import createEvent from "@/actions/create-event";
import { renderMessage } from "@/lib/render-message";

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

  // A utility function to handle uploading of image
  export async function uploadImage(image: File): Promise<string | null> {
    const formData = new FormData();
    formData.set("image", image);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading image.");
      }

      const imageData = await response.json();
      return imageData.data.id;
    } catch (error) {
      renderMessage(error.message, "error");
      return null;
    }
  }

  // A utility function to create an event
  export async function createEventOnServer(eventData: FormData): Promise<boolean> {
    try {
      const response = await createEvent(eventData);
      if (!response.ok) throw new Error("Error creating event.");
      return true;
    } catch (error) {
      renderMessage(error.message, "error");
      return false;
    }
  }