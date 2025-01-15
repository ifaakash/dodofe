export interface InputProps {
	className?: string;
	name?: string;
	type?: string;
	inputRef?: any;
	readOnly?: boolean;
	isValid?: boolean;
	placeholder?: any;
	showError?: boolean;
	errorMsg?: any;
	infoMsg?: any;
	hasLabel?: boolean;
	onChange: (data: any) => void;
	onBlur?: () => void;
	onKeyDown?: (data: any) => void;
	others?: any;
	value: string | number;
	showInfo?: boolean;
	pattern?: RegExp;
	maxLength?: number;
	disabled?: boolean;
	max?: number;
	labelClassname?: string;
	unitTestLabel?: string;
	rightButton?: boolean;
	rightButtonDisabled?: boolean;
	rightButtonAction?: (data?: any) => void;
}
