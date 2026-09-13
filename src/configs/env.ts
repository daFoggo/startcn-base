import { z } from "zod";

/**
 * Quản lý và validate các environment variables phía Client-side.
 * - Cho phép fallback an toàn khi chưa tạo file .env để tránh crash 500 khi vừa clone repo.
 * - Cung cấp cờ `isSupabaseConfigured` để kiểm tra trạng thái kết nối Supabase ở runtime.
 */
const clientEnvSchema = z.object({
	VITE_SUPABASE_URL: z
		.string()
		.url()
		.default("https://placeholder.supabase.co"),
	VITE_SUPABASE_KEY: z.string().default("placeholder-anon-key"),
});

const parsed = clientEnvSchema.safeParse(import.meta.env);

export const clientEnv = parsed.success
	? parsed.data
	: clientEnvSchema.parse({});

export const isSupabaseConfigured = Boolean(
	import.meta.env.VITE_SUPABASE_URL &&
	import.meta.env.VITE_SUPABASE_KEY &&
	import.meta.env.VITE_SUPABASE_URL !== "https://placeholder.supabase.co" &&
	!import.meta.env.VITE_SUPABASE_URL.includes("<your-project>"),
);

if (
	!isSupabaseConfigured &&
	import.meta.env.DEV &&
	typeof window !== "undefined"
) {
	console.info(
		"[env] Supabase credentials not found in .env. Running with auth disabled.",
	);
}
