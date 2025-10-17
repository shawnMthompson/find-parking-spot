"use client";

import { useEffect } from "react";
import { useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter();

  // On site load, automatically redirect the user to the home page via a client side redirect.
  useEffect(() => {
    router.replace("/home");
  }, [router]);

  // what do we display on the initial landing page... nothing! I could add some sort of loading icon though.
  return null;
}