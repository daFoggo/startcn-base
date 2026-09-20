import { createFileRoute } from "@tanstack/react-router";
import { LogsExplorer } from "./-components/logs-explorer";
import { LogsFilterMenu } from "./-components/logs-filter-menu";

const AdminLogsPage = () => <LogsExplorer />;

export const Route = createFileRoute("/_dashboard/dashboard/logs")({
	staticData: {
		breadcrumb: { label: "Logs" },
		productMenu: {
			title: "Logs",
			badge: "Beta",
			component: LogsFilterMenu,
		},
	},
	component: AdminLogsPage,
});
