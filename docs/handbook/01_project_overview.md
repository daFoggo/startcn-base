## Tech Stack

| Area | Technology |
|---|---|
| App framework | TanStack Start |
| Routing | TanStack Router |
| Server state | TanStack Query |
| Data platform | Supabase (JS client) |
| Validation | Zod |
| UI | React 19, shadcn/ui, Base UI |
| Styling | Tailwind CSS v4 |
| Icons | @tabler/icons-react |
| Testing | Vitest |
| Formatting/linting | Biome |
| Build tooling | Vite |

## Environment

Client environment variables are validated in `src/configs/env.ts`.

```env
VITE_SUPABASE_URL=https://gbiwnwzquzhkvkvzcfgy.supabase.co
VITE_SUPABASE_KEY=sb_publishable_...
```

The Supabase client is created once in `src/utils/supabase.ts`.

## External References

- TanStack Start: https://tanstack.com/start/latest/docs/framework/react/overview
- TanStack Router: https://tanstack.com/router/latest/docs/framework/react/overview
- TanStack Query: https://tanstack.com/query/latest/docs/framework/react/overview
- Supabase JS: https://supabase.com/docs/reference/javascript/
- Zod: https://zod.dev
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com/docs
- Base UI: https://base-ui.com/react/overview/quick-start
- Tabler Icons: https://tabler.io/docs/quickstart/react
