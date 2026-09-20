import { IconMenu2 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { AppLogo } from "@/components/common/app-logo";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { AuthUser } from "@/features/auth";
import { DashboardBreadcrumb } from "../breadcrumb/dashboard-breadcrumb";
import { DashboardUserMenu } from "./dashboard-user-menu";

export interface DashboardMobileHeaderProps {
	user: AuthUser;
	isSigningOut?: boolean;
	onSignOut: () => void;
	/** Section hiện tại có product menu hay không (quyết định nút mở sheet). */
	hasProductMenu?: boolean;
	onOpenProductMenu?: () => void;
}

/**
 * Thanh điều hướng riêng cho mobile. Supabase Studio dùng một bar tách biệt
 * thay vì thu nhỏ header desktop, nên layout ở đây cũng làm tương tự.
 */
export const DashboardMobileHeader = ({
	user,
	isSigningOut,
	onSignOut,
	hasProductMenu,
	onOpenProductMenu,
}: DashboardMobileHeaderProps) => (
	<nav className="flex h-12 w-full shrink-0 items-center gap-2 overflow-x-auto border-b bg-sidebar pr-3 pl-2 md:hidden">
		<SidebarTrigger aria-label="Open navigation" />
		<Link to="/" aria-label="Home" className="flex shrink-0 items-center">
			<AppLogo size="sm" hideTitle />
		</Link>
		<div className="min-w-0 flex-1">
			<DashboardBreadcrumb />
		</div>
		<div className="flex shrink-0 items-center gap-1">
			<DashboardUserMenu
				user={user}
				isSigningOut={isSigningOut}
				onSignOut={onSignOut}
			/>
			{hasProductMenu ? (
				<Button
					variant="outline"
					size="icon-sm"
					onClick={onOpenProductMenu}
					aria-label="Open section menu"
				>
					<IconMenu2 />
				</Button>
			) : null}
		</div>
	</nav>
);
