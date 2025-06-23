import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const BrandCard = ({ brand }: { brand: any }) => {
    return (
        <div className="bg-[#F5F4F6] rounded-xl p-2 flex flex-col gap-2 min-w-48 flex-shrink-0">
            <Link href={brand.contentUrl} target="_blank" className="flex items-center justify-between gap-2">
                <Image src={brand.brandLogo} width={40} height={40} alt="Edit" />
                <ArrowUpRight className="text-brandPrimary" />
            </Link>
            <div>
                <div className="text-sm font-semibold">{brand.brandName}</div>
            </div>
            <div className=" border-[1px] border-dashed border-[#E2E4E9]"> </div>
            <div className="text-[10px]">
                <div className="flex justify-between items-center">
                    <div className="text-[#3D4966]"> Type: </div>
                    <div className="flex gap-1">
                        {
                            brand.contentType.split(',').map((type: string, index: number) => (
                                <div key={index} className="text-[#3D4966] font-semibold">
                                    {type.trim()}{index < brand.contentType.split(',').length - 1 ? ',' : ''}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-[#3D4966]"> Reach: </div>
                    <div className="text-[#3D4966] font-semibold"> {brand.reach ? brand.reach + 'K' : 'N/A'} </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-[#3D4966]"> Engagement: </div>
                    <div className="text-[#3D4966] font-semibold"> {brand.engagement ? brand.engagement + '%' : 'N/A'} </div>
                </div>
            </div>
        </div>
    )
}

export default BrandCard