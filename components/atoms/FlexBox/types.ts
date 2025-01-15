export interface FlexboxProps {
	className?: string;
	children?: any;
	justifyCenter?: boolean;
	justifyAround?: boolean;
	justifyBetween?: boolean;
	justifyEnd?: boolean;
	justifyEvenly?: boolean;
	alignEnd?: boolean;
	alignCenter?: boolean;
	alignTop?: boolean;
	flexColumn?: boolean;
	flexWrap?: boolean;
	onClick?: () => void;
	onScroll?: () => void;
	flexBoxRef?: any;
	onTouchMove?: () => void;
	onTouchStart?: () => void;
	unitTestLabel?: string;
}
