"use server";
import { cookies } from "next/headers";

const logoutAction = async () => {
  cookies().delete("jwt");
  return { ok: true };
};

export default logoutAction;
