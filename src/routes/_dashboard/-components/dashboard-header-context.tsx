import { useState } from "react";
import {
	DashboardContextSwitcher,
	DashboardHeaderDivider,
} from "@/components/layout/dashboard";

const WORKSPACES = [
	{ value: "annobot", label: "AnnoBot", description: "Free plan" },
	{ value: "playground", label: "Playground", description: "Free plan" },
];

const ENVIRONMENTS = [
	{ value: "production", label: "production" },
	{ value: "staging", label: "staging" },
];

/**
 * Chuỗi bộ chọn ngữ cảnh trên header (workspace → môi trường), tương ứng với
 * org → project → branch của Supabase Studio.
 */
export const DashboardHeaderContext = () => {
	const [workspace, setWorkspace] = useState(WORKSPACES[0].value);
	const [environment, setEnvironment] = useState(ENVIRONMENTS[0].value);

	return (
		<div className="flex min-w-0 items-center">
			<DashboardContextSwitcher
				label="Workspace"
				value={workspace}
				options={WORKSPACES}
				onValueChange={setWorkspace}
				badge="Free"
			/>
			<DashboardHeaderDivider className="pl-2" />
			<DashboardContextSwitcher
				label="Environment"
				value={environment}
				options={ENVIRONMENTS}
				onValueChange={setEnvironment}
				badge={environment === "production" ? "Production" : "Preview"}
			/>
		</div>
	);
};
