import { IconLayoutDashboard } from "@tabler/icons-react";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export const DashboardPlaceholder = () => {
	return (
		<Empty className="border">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<IconLayoutDashboard />
				</EmptyMedia>
				<EmptyTitle>Dashboard Area</EmptyTitle>
				<EmptyDescription>
					This is a placeholder for your dashboard content. Build your custom
					features, analytics, and data tables here.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
};
