"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Login from "./Components/Login";

export default function Home() {
  const pathname = usePathname();
  // console.log(pathname, "the name is ");
  return (
    <main>
      <Login></Login>
    </main>
  );
}
