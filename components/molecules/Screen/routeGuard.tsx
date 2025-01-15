import { usePathname, useRouter } from 'next/navigation';
import { ROUTE_TYPE } from 'utils/constants';
import { routeArray } from './routeConfig';

export const getRouteGuardDetails = () => {
    const router = useRouter();
    const pathname = usePathname()

    const currentRouteDetail = routeArray[pathname?.split('?')[0]];

    if (!currentRouteDetail) {
        return ROUTE_TYPE.PUBLIC;
    }

    const isRoutePrivate = currentRouteDetail?.type ? currentRouteDetail?.type === ROUTE_TYPE.PRIVATE : true;

    const isRestricted = currentRouteDetail?.restricted;

    if (isRestricted) {
        return ROUTE_TYPE.RESTRICTED;
    }

    return isRoutePrivate ? ROUTE_TYPE.PRIVATE : ROUTE_TYPE.PUBLIC;
};