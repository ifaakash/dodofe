import { FunctionComponent, SVGProps } from 'react';
import { Size } from 'utils/constants';

export interface SVGIconProps {
	className?: string;
	Icon: FunctionComponent<SVGProps<SVGSVGElement>> | any;
	color?: string;
	size?: Size;
	unitTestLabel?: string;
	height?: number | string;
	width?: number | string;
	addDimentionStyle?: boolean;
}
