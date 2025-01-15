import { FunctionComponent, ReactNode, SVGProps, SyntheticEvent } from 'react';

export interface ButtonProps {
	text?: string | ReactNode;
	variant?: 'outline' | 'no-outline' | 'contained' | 'light-text-outline';
	disabled?: boolean;
	className?: string;
	rounded?: boolean;
	onClick?: (event: SyntheticEvent) => void;
	btnColor?:
	| 'theme-1'
	| 'theme-2'
	| 'theme-3'
	| 'light-theme'
	| 'secondary-pink'
	| 'secondary-purple'
	| 'success'
	| 'danger'
	| 'warning'
	| 'primary-blue'
	| 'white';
	size?: 'medium' | 'small' | 'large' | 'extraa-small' | 'extra-large';
	btnSize?: 'small';
	startIcon?: any;
	endIcon?: any;
	endIconClass?: string;
	color?: string;
	loader?: boolean;
	unitTestLabel?: string;
	loaderClass?: string;
	type?: any;
}
