import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/layout/dashboard";
import { DashboardPlaceholder } from "./-components/dashboard-placeholder";

const AdminUsersPage = () => {
	return (
		<DashboardPage title="Users">
			<DashboardPlaceholder />
		</DashboardPage>
	);
};

export const Route = createFileRoute("/_dashboard/dashboard/users")({
	staticData: {
		breadcrumb: { label: "Users" },
	},
	component: AdminUsersPage,
});
