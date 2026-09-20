import {
	IconDownload,
	IconPlayerPlay,
	IconRefresh,
	IconSearch,
} from "@tabler/icons-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { LogEntry, LogLevel } from "./logs-data";
import { SAMPLE_LOGS, useLogsFilterStore } from "./logs-data";

const LEVEL_VARIANT: Record<LogLevel, "secondary" | "outline" | "destructive"> =
	{
		success: "secondary",
		warning: "outline",
		error: "destructive",
	};

const matches = (
	log: LogEntry,
	sources: string[],
	levels: string[],
	search: string,
) => {
	if (sources.length > 0 && !sources.includes(log.source)) return false;
	if (levels.length > 0 && !levels.includes(log.level)) return false;
	if (search && !log.pathname.toLowerCase().includes(search.toLowerCase()))
		return false;
	return true;
};

/**
 * Vùng nội dung của trang Logs: toolbar + bảng, chiếm trọn chiều ngang và tự
 * cuộn — đúng dạng trang "full bleed" của Supabase Studio.
 */
export const LogsExplorer = () => {
	const sources = useLogsFilterStore((state) => state.sources);
	const levels = useLogsFilterStore((state) => state.levels);
	const search = useLogsFilterStore((state) => state.search);
	const setSearch = useLogsFilterStore((state) => state.setSearch);

	const rows = useMemo(
		() => SAMPLE_LOGS.filter((log) => matches(log, sources, levels, search)),
		[sources, levels, search],
	);

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="flex shrink-0 items-center gap-2 border-b px-3 py-2">
				<InputGroup className="max-w-md">
					<InputGroupAddon>
						<IconSearch />
					</InputGroupAddon>
					<InputGroupInput
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Filter by pathname..."
						aria-label="Filter logs"
					/>
				</InputGroup>
				<div className="ml-auto flex items-center gap-1">
					<Button variant="ghost" size="icon-sm" aria-label="Refresh">
						<IconRefresh />
					</Button>
					<Button variant="ghost" size="icon-sm" aria-label="Download">
						<IconDownload />
					</Button>
					<Button variant="outline" size="sm">
						<IconPlayerPlay />
						Live
					</Button>
				</div>
			</div>

			<div className="min-h-0 flex-1 overflow-auto">
				{rows.length === 0 ? (
					<Empty className="m-6 border">
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<IconSearch />
							</EmptyMedia>
							<EmptyTitle>No logs match these filters</EmptyTitle>
							<EmptyDescription>
								Widen the time range or clear the filters in the side panel.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-48">Date</TableHead>
								<TableHead className="w-24">Method</TableHead>
								<TableHead className="w-20">Status</TableHead>
								<TableHead>Pathname</TableHead>
								<TableHead className="w-36">Source</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.map((log) => (
								<TableRow key={log.id}>
									<TableCell className="font-mono text-xs text-muted-foreground">
										{log.timestamp}
									</TableCell>
									<TableCell className="font-mono text-xs">
										{log.method}
									</TableCell>
									<TableCell>
										<Badge variant={LEVEL_VARIANT[log.level]}>
											{log.status}
										</Badge>
									</TableCell>
									<TableCell className="truncate font-mono text-xs">
										{log.pathname}
									</TableCell>
									<TableCell className="text-xs text-muted-foreground">
										{log.source}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</div>
		</div>
	);
};
