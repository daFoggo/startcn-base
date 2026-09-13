import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "@/utils/supabase";
import type { AuthUser, LoginInput } from "./schemas";

export const authKeys = {
	all: ["auth"] as const,
	me: () => [...authKeys.all, "me"] as const,
};

/**
 * Query options lấy thông tin người dùng hiện tại từ Supabase Session gốc.
 * Nếu Supabase chưa được cấu hình, trả về null an toàn mà không throw lỗi.
 */
export const getMeQueryOptions = () =>
	queryOptions({
		queryKey: authKeys.me(),
		queryFn: async (): Promise<AuthUser | null> => {
			if (!isSupabaseConfigured) {
				return null;
			}

			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();

			if (error) throw error;
			if (!session?.user) return null;

			return {
				id: session.user.id,
				email: session.user.email ?? "",
				createdAt: session.user.created_at,
			};
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

/**
 * Mutation Hook xử lý đăng nhập
 */
export const useLoginMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: LoginInput) => {
			if (!isSupabaseConfigured) {
				throw new Error(
					"Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_KEY in your .env file.",
				);
			}

			const { data, error } = await supabase.auth.signInWithPassword({
				email: input.email,
				password: input.password,
			});
			if (error) throw error;
			return data;
		},
		onSuccess: async (data) => {
			queryClient.setQueryData(authKeys.me(), {
				id: data.user.id,
				email: data.user.email ?? "",
				createdAt: data.user.created_at,
			});
			await queryClient.invalidateQueries({ queryKey: authKeys.me() });
		},
	});
};

/**
 * Mutation Hook xử lý đăng xuất
 */
export const useLogoutMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			if (!isSupabaseConfigured) {
				return;
			}

			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		},
		onSuccess: async () => {
			queryClient.setQueryData(authKeys.me(), null);
			queryClient.clear();
			await queryClient.invalidateQueries({ queryKey: authKeys.me() });
		},
	});
};
