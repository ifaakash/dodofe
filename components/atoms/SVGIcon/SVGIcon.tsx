import React from 'react';
import cx from 'classnames';
import { Size } from 'utils/constants';

import { SVGIconProps } from './types';

const getIconSize = (size: Size) => {
	switch (size) {
		case Size.FREE:
			return '100%';
		case Size.TINY:
			return '8px';
		case Size.SMALL:
			return '12px';
		case Size.REGULAR:
			return '16px';
		case Size.MEDIUM:
			return '24px';
		case Size.LARGE:
			return '32px';
		case Size.EXTRALARGE:
			return '40px';
		default:
			return 'auto';
	}
};

const SVGIcon: React.FC<SVGIconProps> = ({
	className,
	Icon,
	color,
	size = Size.REGULAR,
	unitTestLabel,
	height,
	width,
	addDimentionStyle = false,
}) => {
	const getDimetion = (dimention?: number | string) => {
		if (dimention && typeof dimention === 'string' && dimention === 'auto') {
			return dimention;
		}
		if (dimention && typeof dimention === 'number' && dimention > -1) {
			return dimention;
		}
		return 0;
	};
	return (
		<Icon
			width={getDimetion(width) || getIconSize(size)}
			height={getDimetion(height) || getIconSize(size)}
			style={
				addDimentionStyle
					? {
							width: getDimetion(width) || getIconSize(size),
							height: getDimetion(height) || getIconSize(size),
							minWidth: getDimetion(width) || getIconSize(size),
							minHeight: getDimetion(height) || getIconSize(size),
							maxWidth: getDimetion(width) || getIconSize(size),
							maxHeight: getDimetion(height) || getIconSize(size),
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
					: {}
			}
			className={cx('icon', className)}
			fill={color}
			data-unit-test-label={`svg-icon-${unitTestLabel}`}
		/>
	);
};

export default SVGIcon;
