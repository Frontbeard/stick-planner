"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useMemo, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, Shirt, Target, LayoutGrid, Clock } from "lucide-react"

interface PlayerPosition {
  playerId: string
  x: number
  y: number
}

interface FormationBoard {
  id: string
  name: string
  positions: PlayerPosition[]
}

interface CornerToken {
  id: string
  x: number
  y: number
  label: string
  type: "attacker" | "defender" | "ball" | "opponent"
}

interface CornerPlay {
  id: string
  name: string
  description: string
  tokens: CornerToken[]
}

interface DefensiveCornerPlay {
  id: string
  name: string
  description: string
  tokens: CornerToken[]
}

interface DrawingPath {
  id: string
  points: { x: number; y: number }[]
  color: string
}

interface BlockPlay {
  id: string
  name: string
  description: string
  tokens: CornerToken[]
  drawings: DrawingPath[]
}

interface Uniform {
  camiseta: string
  medias: string
}

interface Player {
  id: string
  firstName: string
  lastName: string
  dorsalNumber: number
  position?: string
}

interface SharedData {
  matchInfo: {
    date: string
    time: string
    opponent: string
    location: "local" | "visitante"
    matchday: string
    tournament: string
    round: string
  }
  players: Player[]
  formationBoards: FormationBoard[]
  cornerPlays: CornerPlay[]
  defensiveCornerPlays?: DefensiveCornerPlay[]
  blockPlays?: BlockPlay[]
  uniform?: Uniform
  opponentLogo?: string
  uniformColor?: "blue-fuchsia" | "blue-yellow"
  generatedAt: string
}

// Hockey Field with real image background (vertical)
function HockeyFieldSVG({ positions, players }: { positions: PlayerPosition[]; players: Player[] }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
      <img src="/canchadeagua.png" alt="Hockey field" className="w-full h-auto" />
      {positions.map(pos => {
        const player = players.find(p => p.id === pos.playerId)
        if (!player) return null
        const isGK = player.position === "GK"
        const name = player.lastName || player.firstName
        
        return (
          <div
            key={pos.playerId}
            className="absolute flex flex-col items-center"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white/70 ${isGK ? 'bg-orange-500' : 'bg-blue-500'}`}>
              {player.dorsalNumber}
            </div>
            <span className="text-white text-[11px] font-bold mt-1 whitespace-nowrap" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
              {name.toUpperCase()}
            </span>
          </div>
        )
      })}
    </div>
  )
}

  // Offensive Corner with real image background
  function CornerFieldSVG({ tokens }: { tokens: CornerToken[] }) {
  return (
  <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
  <img src="/cornercorto.png" alt="Corner area" className="w-full h-auto" />
  {tokens.map(t => {
  const isBall = t.type === "ball"
  const isOpponent = t.type === "opponent"
  return (
  <div
  key={t.id}
  className="absolute flex flex-col items-center"
  style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
  >
  <div className={`${isBall ? 'w-5 h-5' : 'w-8 h-8'} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white/70 ${isBall ? 'bg-orange-500' : isOpponent ? 'bg-black' : 'bg-blue-500'}`}>
  {!isBall && t.label}
  </div>
  {!isBall && !isOpponent && (
  <span className="text-white text-[10px] font-bold mt-1 whitespace-nowrap" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
  {t.label.toUpperCase()}
  </span>
  )}
  </div>
  )
  })}
  </div>
  )
  }

  // Defensive Corner with real image background
  function DefensiveCornerFieldSVG({ tokens }: { tokens: CornerToken[] }) {
  return (
  <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
  <img src="/cornercortodef.png" alt="Defensive corner area" className="w-full h-auto" />
  {tokens.map(t => {
  const isBall = t.type === "ball"
  const isOpponent = t.type === "opponent"
  return (
  <div
  key={t.id}
  className="absolute flex flex-col items-center"
  style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
  >
  <div className={`${isBall ? 'w-5 h-5' : 'w-8 h-8'} rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white/70 ${isBall ? 'bg-orange-500' : isOpponent ? 'bg-black' : 'bg-green-500'}`}>
  {!isBall && t.label}
  </div>
  {!isBall && !isOpponent && (
  <span className="text-white text-[10px] font-bold mt-1 whitespace-nowrap" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
  {t.label.toUpperCase()}
  </span>
  )}
  </div>
  )
  })}
  </div>
  )
  }

function ShareContent() {
  const searchParams = useSearchParams()
  const shareId = searchParams.get("id")
  const legacyData = searchParams.get("data")
  const [sharedData, setSharedData] = useState<SharedData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const parseData = () => {
      // Try localStorage first
      if (shareId) {
        const stored = localStorage.getItem(shareId)
        if (stored) {
          try {
            const data = JSON.parse(stored)
            return expandData(data)
          } catch {
            return null
          }
        }
      }
      
      // Try URL-encoded data
      if (legacyData) {
        try {
          const decoded = decodeURIComponent(escape(atob(legacyData)))
          const data = JSON.parse(decoded)
          // Check if it's compressed format
          if (data.m && data.p) {
            return expandData(data)
          }
          // Legacy format
          return data as SharedData
        } catch {
          return null
        }
      }
      
      return null
    }
    
    // Expand compressed data to full format
    const expandData = (d: Record<string, unknown>): SharedData => {
      const m = d.m as Record<string, string>
      return {
        matchInfo: {
          date: m.d,
          time: m.t,
          opponent: m.o,
          location: m.l as "local" | "visitante",
          matchday: m.md,
          tournament: m.to,
          round: m.r,
        },
        players: (d.p as Array<Record<string, unknown>>).map((p) => ({
          id: p.i as string,
          firstName: p.f as string,
          lastName: p.l as string,
          dorsalNumber: p.n as number,
          position: p.po as string | undefined,
        })),
        formationBoards: (d.fb as Array<Record<string, unknown>>).map((b) => ({
          id: b.i as string,
          name: b.n as string,
          positions: ((b.ps as Array<Record<string, unknown>>) || []).map((p) => ({
            playerId: String(p.playerId ?? p.pi ?? ""),
            x: typeof p.x === "number" ? p.x : Number(p.x) || 0,
            y: typeof p.y === "number" ? p.y : Number(p.y) || 0,
          })),
        })),
        cornerPlays: (d.cp as Array<Record<string, unknown>>).map((c) => ({
          id: c.i as string,
          name: c.n as string,
          description: c.d as string,
          tokens: c.t as CornerToken[],
        })),
        defensiveCornerPlays: (d.dcp as Array<Record<string, unknown>>).map((c) => ({
          id: c.i as string,
          name: c.n as string,
          description: c.d as string,
          tokens: c.t as CornerToken[],
        })),
        blockPlays: (d.bp as Array<Record<string, unknown>>).map((b) => ({
          id: b.i as string,
          name: b.n as string,
          description: b.d as string,
          tokens: b.t as CornerToken[],
          drawings: b.dr as DrawingPath[],
        })),
        uniform: d.u as Uniform | undefined,
        opponentLogo: d.ol as string | undefined,
        generatedAt: new Date().toISOString(),
      }
    }

    const id = window.setTimeout(() => {
      setSharedData(parseData())
      setLoading(false)
    }, 0)
    return () => window.clearTimeout(id)
  }, [shareId, legacyData])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  if (!sharedData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="bg-card border-border max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Link inválido o expirado</p>
            <p className="text-xs text-muted-foreground mt-2">Este link solo funciona en el mismo dispositivo donde fue generado.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { matchInfo, players, formationBoards, cornerPlays, defensiveCornerPlays, blockPlays, uniform, opponentLogo } = sharedData
  
  // Default uniform if not provided
  const displayUniform = uniform || { camiseta: "oficial", medias: "oficial" }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00")
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header — fijo */}
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 h-12 sm:h-14 flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stickplanner-bH4F1wYyJg3tj1ECSKyuG7xPoQa1Hb.png"
              alt="Stick Planner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-bold text-foreground tracking-tight">Stick Planner</span>
            <p className="text-[10px] text-primary leading-none">Convocatoria — Club Banco Hipotecario</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6">
        {/* Match Info — alineado con MatchInfoCard en la app principal */}
        <div className="rounded-2xl border border-border/40 bg-card shadow-lg overflow-hidden">
          {/* Eyebrow bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-primary/8 border-b border-border/20">
            <span className="text-[11px] font-bold tracking-widest text-primary uppercase">{matchInfo.matchday}</span>
            <span className="text-[11px] text-muted-foreground">{matchInfo.tournament}</span>
            <div className="w-5" /> {/* spacer to center middle */}
          </div>

          <div className="px-4 py-4">
            {/* Teams row */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 rounded-2xl bg-secondary/40 border border-border/20 overflow-hidden p-1 flex items-center justify-center">
                  <img src="/escudo.png" alt="B. Hipotecario" className="w-full h-full object-contain" />
                </div>
                <span className="text-[11px] font-bold text-foreground tracking-tight">B. HIPOTECARIO</span>
              </div>

              <span className="text-xl font-black text-muted-foreground tracking-widest">VS</span>

              <div className="flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 rounded-2xl bg-secondary/40 border border-border/20 overflow-hidden p-1 flex items-center justify-center">
                  {opponentLogo ? (
                    <img src={opponentLogo} alt={matchInfo.opponent} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-base font-black text-foreground">{matchInfo.opponent.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <span className="text-[11px] font-bold text-foreground tracking-tight">{matchInfo.opponent.toUpperCase()}</span>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex items-center justify-around pt-3 border-t border-border/20 gap-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span className="capitalize">{formatDate(matchInfo.date)}</span>
              </div>
              <div className="h-3 w-px bg-border/40" />
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{matchInfo.time} hs</span>
              </div>
              <div className="h-3 w-px bg-border/40" />
              <div className="flex items-center gap-1.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className={`font-semibold ${matchInfo.location === "local" ? "text-primary" : "text-muted-foreground"}`}>
                  {matchInfo.location === "local" ? "Local" : "Visitante"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Staff */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-card-foreground">Cuerpo Técnico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-xl">
                <span className="font-semibold text-foreground text-sm">Camila Weber</span>
                <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded font-semibold">DT</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-xl">
                <span className="font-semibold text-foreground text-sm">Ivan Starke</span>
                <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded font-semibold">PF</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cited Players */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg text-card-foreground">
                Jugadoras Citadas ({players.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center gap-2 p-2.5 bg-primary/10 border border-primary/20 rounded-xl"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                    {player.dorsalNumber}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {player.lastName}, {player.firstName}
                    </p>
                    {player.position === "GK" && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-accent text-accent-foreground rounded font-semibold">
                        GK
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vestuario — justo después de jugadoras citadas */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shirt className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg text-card-foreground">Vestuario</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-xl border-2 border-primary/30">
                <img
                  src={displayUniform.camiseta === "oficial" ? "/uniforms/camiseta-oficial.png" : "/uniforms/camiseta-alternativa.png"}
                  alt="Camiseta"
                  className="w-full h-auto object-contain mb-2"
                />
                <p className="text-xs font-semibold text-foreground text-center">
                  {displayUniform.camiseta === "oficial" ? "Original" : "Alternativa"}
                </p>
              </div>
              <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-xl border-2 border-primary/30">
                <img src="/uniforms/pollera.png" alt="Pollera" className="w-full h-auto object-contain mb-2" />
                <p className="text-xs font-semibold text-foreground text-center">Pollera</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-secondary/30 rounded-xl border-2 border-primary/30">
                <img
                  src={displayUniform.medias === "oficial" ? "/uniforms/medias-oficial.png" : displayUniform.medias === "fucsia" ? "/uniforms/medias-fucsia.png" : "/uniforms/medias-azul.png"}
                  alt="Medias"
                  className="w-full h-auto object-contain mb-2"
                />
                <p className="text-xs font-semibold text-foreground text-center">
                  {displayUniform.medias === "oficial" ? "Oficial" : displayUniform.medias === "fucsia" ? "Fucsia" : "Azul"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bloqueos */}
        {blockPlays && blockPlays.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg text-card-foreground">Jugadas de Bloqueo</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {blockPlays.map((play) => (
                  <div key={play.id} className="space-y-3">
                    <div className="border-l-4 border-primary pl-3">
                      <h4 className="font-bold text-foreground text-sm">{play.name}</h4>
                      {play.description && (
                        <p className="text-xs text-muted-foreground">{play.description}</p>
                      )}
                    </div>
                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
                      <img src="/canchadeagua.png" alt="Hockey field" className="w-full h-auto" />
                      {/* Drawings */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {play.drawings.map(drawing => (
                          <polyline
                            key={drawing.id}
                            points={drawing.points.map(p => `${p.x}%,${p.y}%`).join(" ")}
                            fill="none"
                            stroke={drawing.color}
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        ))}
                      </svg>
                      {/* Tokens */}
                      {play.tokens.map(t => {
                        const isOpponent = t.type === "opponent"
                        return (
                          <div
                            key={t.id}
                            className="absolute flex flex-col items-center"
                            style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white/70 ${isOpponent ? 'bg-black' : 'bg-blue-500'}`}>
                              {t.label}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Offensive Corners */}
        {cornerPlays && cornerPlays.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg text-card-foreground">Jugadas de Corner Corto Ofensivo</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cornerPlays.map((play) => (
                  <div key={play.id} className="space-y-3">
                    <div className="border-l-4 border-primary pl-3">
                      <h4 className="font-bold text-foreground text-sm">{play.name}</h4>
                      {play.description && (
                        <p className="text-xs text-muted-foreground">{play.description}</p>
                      )}
                    </div>
                    <CornerFieldSVG tokens={play.tokens} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Defensive Corners */}
        {defensiveCornerPlays && defensiveCornerPlays.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg text-card-foreground">Jugadas de Corner Corto Defensivo</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {defensiveCornerPlays.map((play) => (
                  <div key={play.id} className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-3">
                      <h4 className="font-bold text-foreground text-sm">{play.name}</h4>
                      {play.description && (
                        <p className="text-xs text-muted-foreground">{play.description}</p>
                      )}
                    </div>
                    <DefensiveCornerFieldSVG tokens={play.tokens} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      </main>
    </div>
  )
}

export default function SharePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      }
    >
      <ShareContent />
    </Suspense>
  )
}
