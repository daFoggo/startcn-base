import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/layout/dashboard";
import { DashboardPlaceholder } from "../-components/dashboard-placeholder";

const AdminSettingsNotificationsPage = () => {
	return (
		<DashboardPage title="Notifications">
			<DashboardPlaceholder />
		</DashboardPage>
	);
};

export const Route = createFileRoute(
	"/_dashboard/dashboard/settings/notifications",
)({
	staticData: {
		breadcrumb: { label: "Notifications" },
	},
	component: AdminSettingsNotificationsPage,
});
