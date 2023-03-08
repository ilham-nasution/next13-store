import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()} className="btn">
        Sign Out
      </button>
    </>
  );
}
