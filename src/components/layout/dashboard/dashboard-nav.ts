import {
	IconChartBar,
	IconHome,
	IconListDetails,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react";
import { useRouterState } from "@tanstack/react-router";
import type { DashboardNavGroup, DashboardPath } from "./types";

/**
 * Sidebar cấp 1. Mỗi nhóm được ngăn cách bằng `SidebarSeparator`, không dùng
 * group label (giống Supabase Studio).
 */
export const DASHBOARD_NAV: DashboardNavGroup[] = [
	{
		key: "overview",
		items: [
			{ label: "Overview", to: "/dashboard", icon: IconHome, exact: true },
		],
	},
	{
		key: "manage",
		items: [
			{ label: "Users", to: "/dashboard/users", icon: IconUsers },
			{ label: "Analytics", to: "/dashboard/analytics", icon: IconChartBar },
		],
	},
	{
		key: "observability",
		items: [{ label: "Logs", to: "/dashboard/logs", icon: IconListDetails }],
	},
	{
		key: "settings",
		items: [
			{ label: "Settings", to: "/dashboard/settings", icon: IconSettings },
		],
	},
];

export const isPathActive = (
	pathname: string,
	to: DashboardPath,
	exact = false,
) =>
	exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

export const usePathname = () =>
	useRouterState({ select: (state) => state.location.pathname });
