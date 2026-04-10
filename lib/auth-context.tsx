"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  user: { username: string } | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const VALID_USERNAME = "camilaweberdt"
const VALID_PASSWORD = "hipotecarioweber"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        if (typeof window !== "undefined") {
          const storedAuth = sessionStorage.getItem("bhockey_auth")
          if (storedAuth) {
            const parsed = JSON.parse(storedAuth)
            setIsAuthenticated(true)
            setUser(parsed.user)
          }
        }
      } catch (e) {
        console.error("Error reading auth from sessionStorage:", e)
      } finally {
        setIsLoading(false)
      }
    }, 0)
    return () => window.clearTimeout(id)
  }, [])

  const login = (username: string, password: string): boolean => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setIsAuthenticated(true)
      setUser({ username })
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("bhockey_auth", JSON.stringify({ user: { username } }))
        } catch (e) {
          console.error("Error saving auth to sessionStorage:", e)
        }
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("bhockey_auth")
      } catch (e) {
        console.error("Error removing auth from sessionStorage:", e)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
