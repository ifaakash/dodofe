import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DodoPageSkeleton = () => {
    return (
        <div>
        {/* HeroSection */}
        <div className="flex flex-col items-center pt-10">
            <div className="relative">
                <Skeleton circle width={110} height={110} />
                <div className="absolute top-0 right-[-30px]">
                    <Skeleton width={70} height={30} borderRadius={20} />
                </div>
            </div>
            <Skeleton width={160} height={28} style={{ marginTop: 16, marginBottom: 24 }} />
        </div>
        {/* SocialLinks */}
        <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3].map((i) => (
                <Skeleton key={i} circle width={44} height={44} />
            ))}
        </div>
        {/* LinkBlocks */}
        <div className="flex flex-col gap-4 px-5">
            {[1, 2, 3].map((i) => (
                <div key={i} className="p-2 bg-white rounded-xl shadow-sm flex gap-2 items-center">
                    <Skeleton width={50} height={50} borderRadius={12} />
                    <div>
                        <Skeleton width={140} height={18} />
                        <Skeleton width={70} height={20} style={{ marginTop: 8 }} />
                    </div>
                </div>
            ))}
            {/* ProductBlock */}
            <div className="p-2 bg-white rounded-xl shadow-sm flex flex-col items-center max-w-[181px]">
                <Skeleton width={147} height={200} borderRadius={12} />
                <Skeleton width={100} height={18} style={{ marginTop: 12 }} />
            </div>
        </div>
    </div>
    )
}

export default DodoPageSkeleton;