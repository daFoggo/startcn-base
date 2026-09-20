import { create } from "zustand";

export type LogLevel = "success" | "warning" | "error";

export interface LogEntry {
	id: string;
	timestamp: string;
	method: "GET" | "POST" | "HEAD" | "PATCH" | "DELETE";
	status: number;
	pathname: string;
	source: string;
	level: LogLevel;
}

export const LOG_SOURCES = [
	"api-gateway",
	"postgres",
	"auth",
	"storage",
	"edge-function",
] as const;

export type LogSource = (typeof LOG_SOURCES)[number];

/** Dữ liệu mẫu — trang này hiện chỉ dùng để dựng và kiểm chứng layout. */
export const SAMPLE_LOGS: LogEntry[] = [
	{
		id: "1",
		timestamp: "2026-09-21 02:26:28",
		method: "POST",
		status: 200,
		pathname: "/api/v1/annotations/retrieve",
		source: "api-gateway",
		level: "success",
	},
	{
		id: "2",
		timestamp: "2026-09-21 02:26:28",
		method: "HEAD",
		status: 200,
		pathname: "/api/v1/ready",
		source: "api-gateway",
		level: "success",
	},
	{
		id: "3",
		timestamp: "2026-09-21 02:26:28",
		method: "GET",
		status: 200,
		pathname: "/auth/v1/health",
		source: "auth",
		level: "success",
	},
	{
		id: "4",
		timestamp: "2026-09-21 02:19:04",
		method: "POST",
		status: 401,
		pathname: "/auth/v1/token",
		source: "auth",
		level: "warning",
	},
	{
		id: "5",
		timestamp: "2026-09-21 02:14:51",
		method: "GET",
		status: 200,
		pathname: "/api/v1/datasets",
		source: "postgres",
		level: "success",
	},
	{
		id: "6",
		timestamp: "2026-09-21 02:11:37",
		method: "POST",
		status: 500,
		pathname: "/api/v1/annotations/export",
		source: "edge-function",
		level: "error",
	},
	{
		id: "7",
		timestamp: "2026-09-21 02:03:12",
		method: "PATCH",
		status: 200,
		pathname: "/api/v1/annotations/42",
		source: "api-gateway",
		level: "success",
	},
	{
		id: "8",
		timestamp: "2026-09-21 01:58:44",
		method: "GET",
		status: 404,
		pathname: "/storage/v1/object/missing.png",
		source: "storage",
		level: "warning",
	},
	{
		id: "9",
		timestamp: "2026-09-21 01:47:27",
		method: "HEAD",
		status: 200,
		pathname: "/api/v1/ready",
		source: "api-gateway",
		level: "success",
	},
	{
		id: "10",
		timestamp: "2026-09-21 01:40:43",
		method: "GET",
		status: 200,
		pathname: "/auth/v1/health",
		source: "auth",
		level: "success",
	},
	{
		id: "11",
		timestamp: "2026-09-21 01:33:02",
		method: "DELETE",
		status: 500,
		pathname: "/api/v1/datasets/7",
		source: "postgres",
		level: "error",
	},
	{
		id: "12",
		timestamp: "2026-09-21 01:31:50",
		method: "GET",
		status: 200,
		pathname: "/api/v1/annotations",
		source: "api-gateway",
		level: "success",
	},
];

export const LOG_TIME_RANGES = [
	{ value: "15m", label: "Last 15 minutes" },
	{ value: "60m", label: "Last 60 minutes" },
	{ value: "24h", label: "Last 24 hours" },
	{ value: "7d", label: "Last 7 days" },
] as const;

interface LogsFilterState {
	timeRange: string;
	sources: LogSource[];
	levels: LogLevel[];
	search: string;
	setTimeRange: (timeRange: string) => void;
	toggleSource: (source: LogSource) => void;
	toggleLevel: (level: LogLevel) => void;
	setSearch: (search: string) => void;
	reset: () => void;
}

const toggle = <T>(values: T[], value: T) =>
	values.includes(value)
		? values.filter((item) => item !== value)
		: [...values, value];

/**
 * Bộ lọc dùng chung giữa product menu (sidebar cấp 2) và bảng log ở vùng nội
 * dung — hai subtree khác nhau nên state phải nằm ở store, không phải local.
 */
export const useLogsFilterStore = create<LogsFilterState>()((set) => ({
	timeRange: "60m",
	sources: [],
	levels: [],
	search: "",
	setTimeRange: (timeRange) => set({ timeRange }),
	toggleSource: (source) =>
		set((state) => ({ sources: toggle(state.sources, source) })),
	toggleLevel: (level) =>
		set((state) => ({ levels: toggle(state.levels, level) })),
	setSearch: (search) => set({ search }),
	reset: () => set({ sources: [], levels: [], search: "" }),
}));
