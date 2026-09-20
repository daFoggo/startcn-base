import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";

const ScrollContainerContext = createContext<HTMLElement | null>(null);
const SetScrollContainerContext = createContext<
	(container: HTMLElement | null) => void
>(() => {});

export const MainScrollContainerProvider = ({
	children,
}: PropsWithChildren) => {
	const [container, setContainer] = useState<HTMLElement | null>(null);
	const value = useMemo(() => ({ container, setContainer }), [container]);

	return (
		<SetScrollContainerContext value={value.setContainer}>
			<ScrollContainerContext value={value.container}>
				{children}
			</ScrollContainerContext>
		</SetScrollContainerContext>
	);
};

export const useMainScrollContainer = () => useContext(ScrollContainerContext);

export const useSetMainScrollContainer = () =>
	useContext(SetScrollContainerContext);
