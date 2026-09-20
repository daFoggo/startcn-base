import type { PropsWithChildren, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const ProductMenuBarHeader = ({
	className,
	children,
}: PropsWithChildren<{ className?: string }>) => (
	<div
		className={cn(
			"flex min-h-12 shrink-0 items-center justify-between gap-2 border-b px-6",
			className,
		)}
	>
		{children}
	</div>
);

export interface ProductMenuBarProps {
	title: string;
	badge?: string;
	/** Thay toàn bộ nội dung header (ví dụ cần nút back của section). */
	header?: ReactNode;
	className?: string;
	/** Class bổ sung cho header (ví dụ chừa chỗ cho nút đóng của sheet). */
	headerClassName?: string;
}

/**
 * Khung của sidebar cấp 2 (product menu): header cao bằng header chính rồi
 * tới vùng nội dung cuộn được. Không có nút đóng — nếu section cần affordance
 * quay lại thì truyền vào qua `header`.
 */
export const ProductMenuBar = ({
	title,
	badge,
	header,
	className,
	headerClassName,
	children,
}: PropsWithChildren<ProductMenuBarProps>) => (
	<div className="flex h-full w-full flex-col bg-sidebar">
		<ProductMenuBarHeader className={headerClassName}>
			{header ?? (
				<>
					<h4 className="min-w-0 flex-1 truncate text-sm">{title}</h4>
					{badge ? (
						<Badge variant="secondary" className="uppercase">
							{badge}
						</Badge>
					) : null}
				</>
			)}
		</ProductMenuBarHeader>
		<div className={cn("min-h-0 grow overflow-y-auto", className)}>
			{children}
		</div>
	</div>
);
