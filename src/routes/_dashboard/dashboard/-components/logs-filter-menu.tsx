import { IconChevronDown } from "@tabler/icons-react";
import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { LogLevel, LogSource } from "./logs-data";
import {
	LOG_SOURCES,
	LOG_TIME_RANGES,
	SAMPLE_LOGS,
	useLogsFilterStore,
} from "./logs-data";

const LEVELS: { value: LogLevel; label: string; hint: string }[] = [
	{ value: "success", label: "Success", hint: "2xx" },
	{ value: "warning", label: "Warning", hint: "4xx" },
	{ value: "error", label: "Error", hint: "5xx" },
];

const FilterSection = ({
	title,
	children,
}: PropsWithChildren<{ title: string }>) => (
	<Collapsible defaultOpen>
		<CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium data-panel-open:[&_svg]:rotate-180">
			{title}
			<IconChevronDown className="size-4 text-muted-foreground transition-transform" />
		</CollapsibleTrigger>
		<CollapsibleContent className="flex flex-col gap-1 px-4 pb-4">
			{children}
		</CollapsibleContent>
	</Collapsible>
);

const countBySource = (source: LogSource) =>
	SAMPLE_LOGS.filter((log) => log.source === source).length;

/** Sidebar cấp 2 của trang Logs: bộ lọc thay cho danh sách link. */
export const LogsFilterMenu = () => {
	const timeRange = useLogsFilterStore((state) => state.timeRange);
	const setTimeRange = useLogsFilterStore((state) => state.setTimeRange);
	const sources = useLogsFilterStore((state) => state.sources);
	const toggleSource = useLogsFilterStore((state) => state.toggleSource);
	const levels = useLogsFilterStore((state) => state.levels);
	const toggleLevel = useLogsFilterStore((state) => state.toggleLevel);
	const reset = useLogsFilterStore((state) => state.reset);

	return (
		<div className="flex flex-col py-2">
			<FilterSection title="Time Range">
				<Select
					value={timeRange}
					onValueChange={(value) => setTimeRange(String(value))}
				>
					<SelectTrigger className="w-full">
						<SelectValue>
							{(value) =>
								LOG_TIME_RANGES.find((range) => range.value === value)?.label ??
								String(value)
							}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{LOG_TIME_RANGES.map((range) => (
							<SelectItem key={range.value} value={range.value}>
								{range.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FilterSection>
			<Separator />
			<FilterSection title="Log Type">
				{LOG_SOURCES.map((source) => (
					<Label
						key={source}
						className="flex items-center gap-2 py-1 font-normal"
					>
						<Checkbox
							checked={sources.includes(source)}
							onCheckedChange={() => toggleSource(source)}
						/>
						<span className="min-w-0 flex-1 truncate">{source}</span>
						<span className="text-xs text-muted-foreground tabular-nums">
							{countBySource(source)}
						</span>
					</Label>
				))}
			</FilterSection>
			<Separator />
			<FilterSection title="Level">
				{LEVELS.map((level) => (
					<Label
						key={level.value}
						className="flex items-center gap-2 py-1 font-normal"
					>
						<Checkbox
							checked={levels.includes(level.value)}
							onCheckedChange={() => toggleLevel(level.value)}
						/>
						<span className="min-w-0 flex-1 truncate">{level.label}</span>
						<span className="text-xs text-muted-foreground tabular-nums">
							{level.hint}
						</span>
					</Label>
				))}
			</FilterSection>
			<Separator />
			<div className="px-4 py-3">
				<Button variant="outline" size="sm" onClick={reset} className="w-full">
					Reset filters
				</Button>
			</div>
		</div>
	);
};
