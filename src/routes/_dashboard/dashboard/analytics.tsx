import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/layout/dashboard";
import { DashboardPlaceholder } from "./-components/dashboard-placeholder";

const AdminAnalyticsPage = () => {
	return (
		<DashboardPage title="Analytics">
			<DashboardPlaceholder />
		</DashboardPage>
	);
};

export const Route = createFileRoute("/_dashboard/dashboard/analytics")({
	staticData: {
		breadcrumb: { label: "Analytics" },
	},
	component: AdminAnalyticsPage,
});
