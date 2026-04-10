import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/** Cliente para Route Handlers; se crea en tiempo de petición (no en import del módulo). */
export function createRouteSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    )
  }
  return createClient(url, key)
}

/** Misma configuración que {@link createRouteSupabaseClient}, sin lanzar si faltan variables (p. ej. entorno local). */
export function createRouteSupabaseClientOrNull(): SupabaseClient | null {
  try {
    return createRouteSupabaseClient()
  } catch {
    return null
  }
}
