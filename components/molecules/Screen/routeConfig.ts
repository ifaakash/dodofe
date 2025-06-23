import { ROUTE_CONSTANTS } from 'utils/constants';

const ROUTE_TYPE = {
    PRIVATE: 'private',
    PUBLIC: 'public',
};

/*
 * Do mention header details for private routes so that
 * when user logs in page detail is there at the top
 */

export const routeArray = {
    [ROUTE_CONSTANTS.HOME]: {
        type: ROUTE_TYPE.PRIVATE,
        restricted: false,
    },
    [ROUTE_CONSTANTS.BLOGS]: {
        type: ROUTE_TYPE.PUBLIC,
        restricted: false,
    },
    [ROUTE_CONSTANTS.SCRIPT_GENERATOR]: {
        type: ROUTE_TYPE.PUBLIC,
        restricted: false,
    },
    [ROUTE_CONSTANTS.PRICE_CALCULATOR]: {
        type: ROUTE_TYPE.PUBLIC,
        restricted: false,
    },
    [ROUTE_CONSTANTS.LINKS]: {
        type: ROUTE_TYPE.PRIVATE,
        restricted: false,
    },
    [ROUTE_CONSTANTS.LINKS + ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.PREVIEW]: {
        type: ROUTE_TYPE.PRIVATE,
        restricted: false,
    },
    [ROUTE_CONSTANTS.ADD_STUFF]: {
        type: ROUTE_TYPE.PRIVATE,
        restricted: false,
    },
    [ROUTE_CONSTANTS.BASIC_DETAILS]: {
        type: ROUTE_TYPE.PRIVATE,
        restricted: false,
    },
    [ROUTE_CONSTANTS.THEME_SELECT]: {
        type: ROUTE_TYPE.PRIVATE,
        restricted: false,
    },
    [ROUTE_CONSTANTS.LOGIN]: {
        type: ROUTE_TYPE.PUBLIC,
        restricted: true,
    },
    [ROUTE_CONSTANTS.ERROR]: {
        type: ROUTE_TYPE.PUBLIC,
        restricted: true,
    },
    [ROUTE_CONSTANTS.INVOICE + ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.SENDER]: {
        type: ROUTE_TYPE.PRIVATE,
        restricted: true,
    },
    [ROUTE_CONSTANTS.INVOICE + ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.RECEIVER]: {
        type: ROUTE_TYPE.PRIVATE,
        restricted: true,
    },
    [ROUTE_CONSTANTS.INVOICE + ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.DETAILS]: {
        type: ROUTE_TYPE.PRIVATE,
        restricted: true,
    },
    [ROUTE_CONSTANTS.MEDIA_KIT]: {
        type: ROUTE_TYPE.PRIVATE,
        restricted: true,
    },
};
