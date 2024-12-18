import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import env from "@/config/env.config";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
          console.error(error);
        }
      },
    },
  });
};
