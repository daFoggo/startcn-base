import type { PropsWithChildren, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { AuthUser } from "@/features/auth";
import {
	MainScrollContainerProvider,
	useSetMainScrollContainer,
} from "./context/scroll-container";
import { usePathname } from "./dashboard-nav";
import { DashboardHeader } from "./header/dashboard-header";
import { DashboardMobileHeader } from "./header/dashboard-mobile-header";
import {
	DashboardProductMenuContent,
	useDashboardProductMenu,
} from "./product-menu/dashboard-product-menu";
import { DashboardSidebar } from "./sidebar/dashboard-sidebar";

export interface DashboardShellProps {
	user: AuthUser;
	isSigningOut?: boolean;
	onSignOut: () => void;
	/** Bộ chọn ngữ cảnh trên header (workspace, môi trường...). */
	headerContext?: ReactNode;
	/** Hành động cấp ứng dụng trên header. */
	headerActions?: ReactNode;
}

/** Vùng cuộn chính. Cũng là nơi reset scroll mỗi khi đổi route. */
const DashboardScrollArea = ({ children }: PropsWithChildren) => {
	const setMainScrollContainer = useSetMainScrollContainer();
	const containerRef = useRef<HTMLElement | null>(null);
	const pathname = usePathname();

	const setRef = useCallback(
		(node: HTMLElement | null) => {
			containerRef.current = node;
			setMainScrollContainer(node);
		},
		[setMainScrollContainer],
	);

	useEffect(() => {
		containerRef.current?.scrollTo({ top: 0, left: 0 });
	}, [pathname]);

	return (
		<main
			id="dashboard-main"
			ref={setRef}
			tabIndex={-1}
			className="flex min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto bg-background outline-hidden"
		>
			{children}
		</main>
	);
};

/**
 * Khung chung của dashboard:
 *
 * ```
 * header (full width)
 * ────────────────────────────────
 * sidebar │ product menu │ main
 * ```
 *
 * Header nằm trên cùng và chạy hết chiều ngang; sidebar là anh em nằm dưới nó
 * (đúng như Supabase Studio, khác với bố cục mặc định của shadcn).
 */
export const DashboardShell = ({
	user,
	isSigningOut,
	onSignOut,
	headerContext,
	headerActions,
	children,
}: PropsWithChildren<DashboardShellProps>) => {
	const productMenu = useDashboardProductMenu();
	const pathname = usePathname();
	const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

	// Đóng sheet product menu sau khi điều hướng trên mobile.
	useEffect(() => {
		setIsProductMenuOpen(false);
	}, [pathname]);

	return (
		<MainScrollContainerProvider>
			<SidebarProvider defaultOpen className="h-svh w-full">
				<div className="flex h-full w-full flex-col overflow-hidden">
					<a
						href="#dashboard-main"
						className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-1.5 focus:text-sm focus:ring-2 focus:ring-ring"
					>
						Skip to content
					</a>
					<div className="shrink-0">
						<DashboardMobileHeader
							user={user}
							isSigningOut={isSigningOut}
							onSignOut={onSignOut}
							hasProductMenu={Boolean(productMenu)}
							onOpenProductMenu={() => setIsProductMenuOpen(true)}
						/>
						<DashboardHeader
							user={user}
							isSigningOut={isSigningOut}
							onSignOut={onSignOut}
							context={headerContext}
							actions={headerActions}
						/>
					</div>
					<div className="flex w-full flex-1 overflow-y-hidden">
						<DashboardSidebar />
						<div className="flex min-w-0 flex-1">
							{productMenu ? (
								<aside className="hidden w-64 shrink-0 border-r md:flex">
									<DashboardProductMenuContent productMenu={productMenu} />
								</aside>
							) : null}
							<DashboardScrollArea>{children}</DashboardScrollArea>
						</div>
					</div>
				</div>

				<Sheet open={isProductMenuOpen} onOpenChange={setIsProductMenuOpen}>
					<SheetContent side="left" className="w-72 bg-sidebar p-0 md:hidden">
						<SheetHeader className="sr-only">
							<SheetTitle>{productMenu?.title ?? "Section menu"}</SheetTitle>
							<SheetDescription>Section navigation</SheetDescription>
						</SheetHeader>
						{productMenu ? (
							<DashboardProductMenuContent
								productMenu={productMenu}
								headerClassName="pr-12"
							/>
						) : null}
					</SheetContent>
				</Sheet>
			</SidebarProvider>
		</MainScrollContainerProvider>
	);
};
