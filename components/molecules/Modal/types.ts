export interface ModalProps {
	visible?: boolean;
	onClose?: () => void;
	showMask?: boolean;
	className?: string;
	isPullable?: boolean;
	isBackgroundBlur?: boolean;
	modalHeader?: any;
	modalHeaderClass?: string;
	showCloseIcon?: boolean;
	onCloseIconClick?: () => void;
	headerIcon?: any;
	children?: React.ReactNode;
	unitTestLabel?: string;
	center?: boolean;
	rectangleVisible?: boolean;
	showOuterCloseIcon?: boolean;
	bottomSheet?: boolean;
	disableBackdropClick?: boolean;
	customStyles?: any;
	fullVhHeight?: boolean;
}

export interface StyleType {
	display: string;
	animationDuration: string;
	WebkitAnimationDuration: string;
}
