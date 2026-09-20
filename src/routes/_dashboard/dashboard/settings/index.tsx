import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/layout/dashboard";
import { DashboardPlaceholder } from "../-components/dashboard-placeholder";

const AdminSettingsGeneralPage = () => {
	return (
		<DashboardPage title="General">
			<DashboardPlaceholder />
		</DashboardPage>
	);
};

export const Route = createFileRoute("/_dashboard/dashboard/settings/")({
	component: AdminSettingsGeneralPage,
});
