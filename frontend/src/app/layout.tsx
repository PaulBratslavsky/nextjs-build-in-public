import type { Metadata } from "next";
import type { APIResponseData } from "@/types/types";
import qs from "qs";
import fetcher from "@/lib/fetcher";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from '@/components/Header'

const query = qs.stringify({
  populate: {
    logo: { populate: "*" },
    mainNav: { populate: "*" },
    secondaryNav: { populate: "*" },
  },
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetcher("global", query);

  //TODO: HANDLE ERROR
  if (res === null) return <></>;

  const global = await res.json() as APIResponseData<"api::global.global">;
  // console.dir(global, { depth: null });

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header data={global}/>
        {children}
      </body>
    </html>
  );
}
