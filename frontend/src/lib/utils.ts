import { type ClassValue, clsx } from "clsx";
import { format, parse } from "date-fns";
import { twMerge } from "tailwind-merge";
import createEvent from "@/actions/create-event-action";
import updateEvent from "@/actions/update-event-action";
import updateUser from "@/actions/update-user-action";
import { renderMessage } from "@/lib/render-message";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export async function deleteImage(imageId: string): Promise<string | null> {
  if (!imageId) {
    renderMessage("No, image id provided.", "error");
    return null;
  }

  const formData = new FormData();
  formData.set("body", JSON.stringify({ id: imageId }));

  try {
    const response = await fetch(`/api/delete`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error deleting image.");
    }

    const imageData = await response.json();
    return imageData;
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
    return "hello";
  }
}

export async function createEventOnServer(
  eventData: FormData
): Promise<boolean> {
  try {
    const response = await createEvent(eventData);
    if (!response.ok) throw new Error("Error creating event.");
    return true;
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
    return false;
  }
}

export async function updateEventOnServer(
  eventData: object,
  id: number
): Promise<boolean> {
  const response = await updateEvent(eventData, id);

  if (response.error) {
    renderMessage(response.error.message, "error");
    return false;
  } else {
    renderMessage("Event updated successfully!", "success");
    return true 
  }

}

export async function updateUserOnServer(
  userData: object,
  id: string
): Promise<boolean> {
  const response = await updateUser(userData, id);

  if (response.error) {
    renderMessage(response.error.message, "error");
    return false;
  } else {
    renderMessage("User updated successfully!", "success");
    return true 
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

export function checkAndFormatTime(timeString: string) {
  // Regular expression to match the "HH:mm:ss.SSS" format
  const timeFormatRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)\.\d{3}$/;

  // Check if the time string matches the "HH:mm:ss.SSS" format
  if (timeFormatRegex.test(timeString)) {
    // If it matches, return the time string as is or perform any other necessary action
    return timeString;
  } else {
    // If it doesn't match, run the specific code block
    const time = format(
      parse(timeString, "HH:mm", new Date()),
      "HH:mm:ss.SSS"
    );
    return time;
  }
}