import GeneralStats from "@components/molecules/mediaKitBlocks/GeneralStats"
import FollowerCount from "@components/molecules/mediaKitBlocks/FollowerCount"
import GenderDistribution from "../mediaKitBlocks/GenderDistribution"
import AgeDistribution from "../mediaKitBlocks/AgeDistribution"
import BrandCollaboration from "../mediaKitBlocks/BrandCollaboration"
import LocationDistribution from "../mediaKitBlocks/LocationDistribution"
import InstaRateCard from "../mediaKitBlocks/InstaRateCard"

const MediaKitBlocks = () => {
    return (
        <div className="flex flex-col gap-[10px] w-full pb-4">
            <div className="flex flex-col gap-1">
                <FollowerCount />
                <GeneralStats />
            </div>
            <GenderDistribution/>
            <BrandCollaboration/>
            <AgeDistribution/>
            <LocationDistribution/>
            <InstaRateCard/>
        </div>
    )
}

export default MediaKitBlocks