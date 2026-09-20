import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ProductMenuNav } from "@/components/layout/dashboard";

const SettingsProductMenu = () => (
	<ProductMenuNav
		groups={[
			{
				key: "workspace",
				title: "Workspace",
				items: [{ label: "General", to: "/dashboard/settings", exact: true }],
			},
			{
				key: "account",
				title: "Account",
				items: [
					{ label: "Security", to: "/dashboard/settings/security" },
					{ label: "Notifications", to: "/dashboard/settings/notifications" },
				],
			},
		]}
	/>
);

const AdminSettingsLayout = () => <Outlet />;

export const Route = createFileRoute("/_dashboard/dashboard/settings")({
	staticData: {
		breadcrumb: { label: "Settings", to: "/dashboard/settings" },
		productMenu: {
			title: "Settings",
			component: SettingsProductMenu,
		},
	},
	component: AdminSettingsLayout,
});
