import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import createEvent from "@/actions/create-event-action";
import { renderMessage } from "@/lib/render-message";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
    if (error instanceof Error) {
      // If error is an instance of Error, it will have a message property
      renderMessage(error.message, "error");
    } else {
      // Fallback for other types of thrown values
      const errorMessage =
        typeof error === "string" ? error : "An unknown error occurred";
      renderMessage(errorMessage, "error");
    }
    return null;
  }
}

// A utility function to create an event
export async function createEventOnServer(
  eventData: FormData
): Promise<boolean> {
  try {
    const response = await createEvent(eventData);
    if (!response.ok) throw new Error("Error creating event.");
    return true;
  } catch (error) {
    renderMessage(error.message, "error");
    return false;
  }
}

export function flattenAttributes(data: any): any {
  // Base case for recursion
  if (!data) return null;

  // Handling array data
  if (Array.isArray(data)) {
    return data.map(flattenAttributes);
  }

  let flattened: { [key: string]: any } = {};

  // Handling attributes
  if (data.attributes) {
    for (let key in data.attributes) {
      if (
        typeof data.attributes[key] === "object" &&
        data.attributes[key] !== null &&
        "data" in data.attributes[key]
      ) {
        flattened[key] = flattenAttributes(data.attributes[key].data);
      } else {
        flattened[key] = data.attributes[key];
      }
    }
  }

  // Copying non-attributes and non-data properties
  for (let key in data) {
    if (key !== "attributes" && key !== "data") {
      flattened[key] = data[key];
    }
  }

  // Handling nested data
  if (data.data) {
    flattened = { ...flattened, ...flattenAttributes(data.data) };
  }

  return flattened;
}
