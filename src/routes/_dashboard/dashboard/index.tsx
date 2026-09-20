import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/layout/dashboard";
import { DashboardPlaceholder } from "./-components/dashboard-placeholder";

const AdminOverviewPage = () => {
	return (
		<DashboardPage
			title="Dashboard"
			description="Welcome to your admin dashboard. This is a starter placeholder ready for your content."
		>
			<DashboardPlaceholder />
		</DashboardPage>
	);
};

export const Route = createFileRoute("/_dashboard/dashboard/")({
	component: AdminOverviewPage,
});
