import { IconSelector } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface DashboardContextOption {
	value: string;
	label: string;
	description?: string;
}

export interface DashboardContextSwitcherProps {
	/** Nhãn của nhóm lựa chọn, hiển thị trong dropdown và dùng cho aria-label. */
	label: string;
	value: string;
	options: DashboardContextOption[];
	onValueChange?: (value: string) => void;
	/** Badge hiển thị cạnh giá trị đang chọn (plan, môi trường...). */
	badge?: ReactNode;
	footer?: ReactNode;
}

/**
 * Dropdown chọn ngữ cảnh trên header (workspace, project, môi trường...),
 * dựng theo đúng hình dáng của bộ chọn org/project/branch trong Supabase Studio.
 */
export const DashboardContextSwitcher = ({
	label,
	value,
	options,
	onValueChange,
	badge,
	footer,
}: DashboardContextSwitcherProps) => {
	const selected = options.find((option) => option.value === value);

	return (
		<div className="flex min-w-0 items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button variant="ghost" size="sm" aria-label={label}>
							<span className="max-w-32 truncate">
								{selected?.label ?? value}
							</span>
							<IconSelector className="text-muted-foreground" />
						</Button>
					}
				/>
				<DropdownMenuContent align="start" className="w-64">
					<DropdownMenuRadioGroup
						value={value}
						onValueChange={(next) => onValueChange?.(String(next))}
					>
						<DropdownMenuLabel>{label}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{options.map((option) => (
							<DropdownMenuRadioItem key={option.value} value={option.value}>
								<span className="flex min-w-0 flex-col">
									<span className="truncate">{option.label}</span>
									{option.description ? (
										<span className="truncate text-xs text-muted-foreground">
											{option.description}
										</span>
									) : null}
								</span>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
					{footer ? (
						<>
							<DropdownMenuSeparator />
							{footer}
						</>
					) : null}
				</DropdownMenuContent>
			</DropdownMenu>
			{typeof badge === "string" ? (
				<Badge variant="outline">{badge}</Badge>
			) : (
				badge
			)}
		</div>
	);
};
