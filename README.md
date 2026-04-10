# Stick Planner

Aplicación de planificación para hockey. Desarrollada por [Hako Studio](https://www.instagram.com/hako.std/).

Stack: [Next.js](https://nextjs.org), [Supabase](https://supabase.com), React y Tailwind CSS.

## Requisitos

- Node.js 20+
- Cuenta Supabase con el esquema aplicado (scripts en `/scripts`)

## Variables de entorno

Creá `.env.local` en la raíz con:

- `NEXT_PUBLIC_SUPABASE_URL` — URL del proyecto (Settings → API)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — clave publicable / anon

Reiniciá el servidor de desarrollo después de cambiar el entorno.

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Producción

```bash
pnpm build
pnpm start
```
