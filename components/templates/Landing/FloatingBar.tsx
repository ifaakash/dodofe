'use client'

import { ROUTE_CONSTANTS } from "@utils/constants";
import { usePathname, useRouter } from "next/navigation";

const FloatingBar = () => {
  const router = useRouter();
  const pathname = usePathname()

  const isHomePage = pathname === '/';
  const isBrandPage = pathname === '/for-brands';

  return (
    <div className="floating-bar">
      <div className='flex justify-between px-12 py-4 items-center gap-10 w-full floating-bar-content'>
        <button className={`${isHomePage ? 'font-semibold' : 'font-medium'}`} onClick={() => router.push(ROUTE_CONSTANTS.FOR_CREATORS)}>For Creators</button>
        <button className={`${isBrandPage ? 'font-semibold' : 'font-medium'}`} onClick={() => router.push(ROUTE_CONSTANTS.FOR_BRANDS)}>For Brands</button>
        <button className='font-medium' onClick={() => router.push(ROUTE_CONSTANTS.BLOGS)}>Blogs</button>
        <button className='font-medium' onClick={() => router.push('mailto:contact@dodoclub.in')}>Contact Us</button>
      </div>
    </div>
  );
};

export default FloatingBar