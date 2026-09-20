import { useMatches } from "@tanstack/react-router";
import type { DashboardProductMenu } from "../types";
import { ProductMenuBar } from "./product-menu-bar";

/**
 * Lấy product menu của section hiện tại từ `staticData.productMenu`.
 * Dùng `useMatches({ select })` để shell không re-render mỗi lần router tick.
 */
export const useDashboardProductMenu = (): DashboardProductMenu | undefined =>
	useMatches({
		select: (matches) => {
			for (let index = matches.length - 1; index >= 0; index -= 1) {
				const { productMenu } = matches[index].staticData;
				if (productMenu) return productMenu;
			}
			return undefined;
		},
	});

export interface DashboardProductMenuContentProps {
	productMenu: DashboardProductMenu;
	headerClassName?: string;
}

export const DashboardProductMenuContent = ({
	productMenu,
	headerClassName,
}: DashboardProductMenuContentProps) => {
	const Menu = productMenu.component;

	return (
		<ProductMenuBar
			title={productMenu.title}
			badge={productMenu.badge}
			headerClassName={headerClassName}
		>
			<Menu />
		</ProductMenuBar>
	);
};
