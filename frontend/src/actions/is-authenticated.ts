"use server";
import { cookies } from "next/headers";
import meAction from "./me-action";
import { redirect } from "next/navigation";

const isAuthenticate = async () => {
  console.log("Is Authenticated");
  const user = await meAction();
  console.log(user?.error, "<===== user");
  if (user?.error) {
    cookies().delete("jwt");
    redirect("/signin");
  } else {
    return true;
  }
};

export default isAuthenticate;
