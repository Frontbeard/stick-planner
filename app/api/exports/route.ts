import { NextRequest, NextResponse } from "next/server"
import { createRouteSupabaseClientOrNull } from "@/lib/supabase/route-client"

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteSupabaseClientOrNull()
    if (!supabase) {
      return NextResponse.json(
        {
          error:
            "Falta configurar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en el servidor",
        },
        { status: 503 },
      )
    }
    const body = await request.json()
    const { data } = body

    if (!data) {
      return NextResponse.json(
        { error: "No data provided" },
        { status: 400 }
      )
    }

    // Guardar en shared_exports
    const { data: result, error } = await supabase
      .from("shared_exports")
      .insert([{ data }])
      .select("id")
      .single()

    if (error) {
      console.error("Error saving export:", error)
      return NextResponse.json(
        { error: "Failed to save export" },
        { status: 500 }
      )
    }

    return NextResponse.json({ id: result.id })
  } catch (error) {
    console.error("Export API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
