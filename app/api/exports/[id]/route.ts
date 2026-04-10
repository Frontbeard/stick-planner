import { NextRequest, NextResponse } from "next/server"
import { createRouteSupabaseClientOrNull } from "@/lib/supabase/route-client"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createRouteSupabaseClientOrNull()
    if (!supabase) {
      return NextResponse.json(
        {
          error:
            "Servidor sin base de datos configurada (variables Supabase)",
        },
        { status: 503 },
      )
    }
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: "No export ID provided" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("shared_exports")
      .select("data")
      .eq("id", id)
      .single()

    if (error || !data) {
      console.error("Error fetching export:", error)
      return NextResponse.json(
        { error: "Export not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(data.data)
  } catch (error) {
    console.error("Export retrieval error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
