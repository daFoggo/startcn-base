export { DashboardBreadcrumb } from "./breadcrumb/dashboard-breadcrumb";
export {
	useMainScrollContainer,
	useSetMainScrollContainer,
} from "./context/scroll-container";
export { DASHBOARD_NAV, isPathActive, usePathname } from "./dashboard-nav";
export { DashboardShell } from "./dashboard-shell";
export type { DashboardShellProps } from "./dashboard-shell";
export { DashboardContextSwitcher } from "./header/dashboard-context-switcher";
export type {
	DashboardContextOption,
	DashboardContextSwitcherProps,
} from "./header/dashboard-context-switcher";
export { DashboardHeaderDivider } from "./header/dashboard-header-divider";
export { DashboardPage } from "./page/dashboard-page";
export type { DashboardPageProps } from "./page/dashboard-page";
export { useDashboardProductMenu } from "./product-menu/dashboard-product-menu";
export { ProductMenuNav } from "./product-menu/product-menu";
export {
	ProductMenuBar,
	ProductMenuBarHeader,
} from "./product-menu/product-menu-bar";
export type {
	DashboardCrumb,
	DashboardNavGroup,
	DashboardNavItem,
	DashboardPath,
	DashboardProductMenu,
	DashboardProductMenuGroup,
	DashboardProductMenuItem,
} from "./types";
