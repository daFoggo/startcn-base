import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppLogo } from "@/components/common/app-logo";
import { ThemeToggle } from "@/components/common/theme-provider";
import type { AuthUser } from "@/features/auth";
import { DashboardBreadcrumb } from "../breadcrumb/dashboard-breadcrumb";
import { DashboardHeaderDivider } from "./dashboard-header-divider";
import { DashboardHelpMenu } from "./dashboard-help-menu";
import { DashboardSearchTrigger } from "./dashboard-search-trigger";
import { DashboardUserMenu } from "./dashboard-user-menu";

export interface DashboardHeaderProps {
	user: AuthUser;
	isSigningOut?: boolean;
	onSignOut: () => void;
	/** Các bộ chọn ngữ cảnh (workspace, môi trường...) nằm sau logo. */
	context?: ReactNode;
	/** Hành động cấp ứng dụng nằm sau breadcrumb (ví dụ nút "Connect"). */
	actions?: ReactNode;
}

/**
 * Header chạy hết chiều ngang và nằm TRÊN sidebar, đúng như Supabase Studio.
 * Chỉ hiển thị từ breakpoint `md`; dưới đó dùng `DashboardMobileHeader`.
 */
export const DashboardHeader = ({
	user,
	isSigningOut,
	onSignOut,
	context,
	actions,
}: DashboardHeaderProps) => (
	<header className="hidden h-11 shrink-0 items-center border-b bg-sidebar md:flex md:h-12">
		<div className="flex h-full flex-1 items-center justify-between gap-x-8 overflow-x-auto pr-3 pl-4">
			<div className="flex min-w-0 items-center text-sm">
				<Link to="/" aria-label="Home" className="flex shrink-0 items-center">
					<AppLogo size="sm" hideTitle />
				</Link>
				{context ? (
					<div className="flex items-center pl-2">
						<DashboardHeaderDivider />
						{context}
					</div>
				) : null}
				<DashboardHeaderDivider className="pl-2" />
				<DashboardBreadcrumb />
				{actions ? (
					<div className="ml-3 flex shrink-0 items-center gap-x-2">
						{actions}
					</div>
				) : null}
			</div>
			<div className="flex shrink-0 items-center gap-x-2">
				<DashboardSearchTrigger />
				<div className="flex items-center gap-1">
					<DashboardHelpMenu />
					<ThemeToggle />
				</div>
				<DashboardUserMenu
					user={user}
					isSigningOut={isSigningOut}
					onSignOut={onSignOut}
				/>
			</div>
		</div>
	</header>
);
