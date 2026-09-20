import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/layout/dashboard";
import { DashboardPlaceholder } from "../-components/dashboard-placeholder";

const AdminSettingsSecurityPage = () => {
	return (
		<DashboardPage title="Security">
			<DashboardPlaceholder />
		</DashboardPage>
	);
};

export const Route = createFileRoute("/_dashboard/dashboard/settings/security")(
	{
		staticData: {
			breadcrumb: { label: "Security" },
		},
		component: AdminSettingsSecurityPage,
	},
);
