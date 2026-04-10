import { createRouteSupabaseClientOrNull } from "@/lib/supabase/route-client"

export async function GET(request: Request) {
  try {
    const supabase = createRouteSupabaseClientOrNull()
    const { searchParams } = new URL(request.url)
    const fixtureId = searchParams.get("fixtureId")

    if (!fixtureId) {
      return Response.json([], { status: 400 })
    }

    if (!supabase) {
      return Response.json([], { status: 200 })
    }

    const { data, error } = await supabase
      .from("match_cited_players")
      .select("player_id")
      .eq("fixture_id", fixtureId)

    if (error) {
      console.error("Error fetching cited players:", error)
      return Response.json([], { status: 200 })
    }

    return Response.json(data.map(d => d.player_id))
  } catch (error) {
    console.error("Error in cited-players API:", error)
    return Response.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteSupabaseClientOrNull()
    if (!supabase) {
      return Response.json(
        { error: "Servidor sin configuración de base de datos", success: false },
        { status: 503 },
      )
    }
    const { fixtureId, playerId, remove } = await request.json()

    if (!fixtureId || !playerId) {
      return Response.json({ error: "Missing fixtureId or playerId" }, { status: 400 })
    }

    if (remove) {
      // Remove cited player
      const { error } = await supabase
        .from("match_cited_players")
        .delete()
        .eq("fixture_id", fixtureId)
        .eq("player_id", playerId)

      if (error) {
        console.error("Error removing cited player:", error)
        return Response.json({ error: error.message }, { status: 500 })
      }
    } else {
      // Add cited player
      const { error } = await supabase
        .from("match_cited_players")
        .insert({ fixture_id: fixtureId, player_id: playerId })

      if (error) {
        console.error("Error adding cited player:", error)
        return Response.json({ error: error.message }, { status: 500 })
      }
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error in cited-players POST:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
