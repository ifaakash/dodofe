import { SyntheticEvent } from 'react';

export interface FooterProps {
	topContent?: React.ReactNode;
	children?: React.ReactNode;
	variant?: string;
	buttonVariant?: 'outline' | 'no-outline';
	primaryAction?: (event: SyntheticEvent) => void;
	secondaryAction?: (event: SyntheticEvent) => void;
	primaryActionText?: string;
	secondaryActionText?: string;
	disablePrimaryButton?: boolean;
	disableSecondaryButton?: boolean;
	checkboxLabel?: string | React.ReactNode;
	onCheckboxClick?: (event: boolean) => void;
	isCheckboxChecked?: boolean;
	showCheckbox?: boolean;
	isSticky?: boolean;
	className?: string;
	btnColor?:
		| 'theme-1'
		| 'theme-2'
		| 'theme-3'
		| 'secondary-pink'
		| 'secondary-purple'
		| 'success'
		| 'danger'
		| 'warning'
		| 'white';
	showShadow?: boolean;
	secondaryColor?: string;
	setFooterHeight?: (padding: number) => void;
	loader?: boolean;
	primaryBtnEndIcon?: any;
	unitTestLabel?: string;
}
