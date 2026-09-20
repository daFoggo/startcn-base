import { Link, useMatches } from "@tanstack/react-router";
import { Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { DashboardCrumb } from "../types";

export const DashboardBreadcrumb = () => {
	const routeCrumbs = useMatches({
		select: (matches) =>
			matches.flatMap((match) =>
				match.staticData.breadcrumb ? [match.staticData.breadcrumb] : [],
			),
	});

	const items: DashboardCrumb[] = [
		{ label: "Overview", to: "/dashboard" },
		...routeCrumbs.map((crumb) => ({
			label: crumb.label,
			to: crumb.to,
		})),
	];

	return (
		<Breadcrumb className="min-w-0">
			<BreadcrumbList className="flex-nowrap gap-1.5">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					const to = item.to;

					return (
						<Fragment key={`${to ?? "leaf"}-${index}`}>
							<BreadcrumbItem className="min-w-0">
								{isLast || !to ? (
									<BreadcrumbPage className="truncate">
										{item.label}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink
										render={<Link to={to} />}
										className="truncate"
									>
										{item.label}
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator className="shrink-0" />}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
