import { Link } from "@tanstack/react-router";
import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import { DASHBOARD_NAV, isPathActive, usePathname } from "../dashboard-nav";
import { DashboardSidebarControl } from "./dashboard-sidebar-control";

/**
 * Sidebar cấp 1. Không có header/logo, không có group label — các nhóm chỉ
 * ngăn cách bằng separator, giống Supabase Studio. Chỉ có hai trạng thái:
 * mở rộng hoặc thu gọn thành icon, đổi bằng nút ở footer.
 */
export const DashboardSidebar = () => {
	const pathname = usePathname();

	return (
		<Sidebar collapsible="icon" variant="sidebar">
			<SidebarContent>
				{DASHBOARD_NAV.map((group, index) => (
					<Fragment key={group.key}>
						{index > 0 ? <SidebarSeparator /> : null}
						<SidebarGroup className="gap-0.5">
							<SidebarMenu>
								{group.items.map((item) => (
									<SidebarMenuItem key={item.to}>
										<SidebarMenuButton
											render={<Link to={item.to} />}
											isActive={isPathActive(pathname, item.to, item.exact)}
											tooltip={item.label}
										>
											<item.icon />
											<span>{item.label}</span>
											{item.badge ? (
												<Badge variant="secondary" className="ml-auto">
													{item.badge}
												</Badge>
											) : null}
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroup>
					</Fragment>
				))}
			</SidebarContent>
			<SidebarFooter>
				<SidebarGroup className="p-0">
					<DashboardSidebarControl />
				</SidebarGroup>
			</SidebarFooter>
		</Sidebar>
	);
};
