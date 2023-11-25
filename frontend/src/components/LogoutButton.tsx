'use client'

import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import logoutAction from "@/actions/logout-action";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { setUser } = useAppContext();
  const router = useRouter();
  async function handleLogout() {
    const response = await logoutAction();
    response.ok && setUser(null);
    router.push("/");
  }

  return (
    <Button onClick={() => handleLogout()} variant="outline" className="w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
      <span className="ml-2">Logout</span>
    </Button>
  );
}
