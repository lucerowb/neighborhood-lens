import { createBrowserClient } from "@supabase/ssr";

import env from "@/config/env.config";

export const createClient = () => createBrowserClient(env.supabase.url, env.supabase.anonKey);
