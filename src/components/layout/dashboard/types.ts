import type { ComponentType } from "react";

/**
 * Tất cả route nằm trong dashboard shell. Khai báo dạng union để mọi link
 * trong layout đều được TanStack Router type-check.
 */
export type DashboardPath =
	| "/dashboard"
	| "/dashboard/users"
	| "/dashboard/analytics"
	| "/dashboard/logs"
	| "/dashboard/settings"
	| "/dashboard/settings/security"
	| "/dashboard/settings/notifications";

export type DashboardIcon = ComponentType<{ className?: string }>;

/** Một mục của sidebar cấp 1 (icon rail). */
export interface DashboardNavItem {
	label: string;
	to: DashboardPath;
	icon: DashboardIcon;
	exact?: boolean;
	badge?: string;
}

/** Sidebar cấp 1 được chia nhóm, mỗi nhóm cách nhau bằng separator (không có label). */
export interface DashboardNavGroup {
	key: string;
	items: DashboardNavItem[];
}

/** Một mắt xích của breadcrumb, khai báo qua `staticData.breadcrumb`. */
export interface DashboardCrumb {
	label: string;
	to?: DashboardPath;
}

/** Một mục trong product menu (sidebar cấp 2). */
export interface DashboardProductMenuItem {
	label: string;
	to: DashboardPath;
	icon?: DashboardIcon;
	badge?: string;
	exact?: boolean;
}

export interface DashboardProductMenuGroup {
	key: string;
	title?: string;
	items: DashboardProductMenuItem[];
}

/**
 * Product menu của một section, khai báo qua `staticData.productMenu` trên
 * route layout của section đó. `component` là một component ở module scope
 * (identity ổn định) nên shell render trực tiếp, không cần portal.
 */
export interface DashboardProductMenu {
	title: string;
	badge?: string;
	component: ComponentType;
}
