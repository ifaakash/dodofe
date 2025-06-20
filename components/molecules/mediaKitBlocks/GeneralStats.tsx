import BlobChart from "@components/atoms/Charts/BlobChart"
import UploadIcon from "/public/icons/upload2.svg"
import Image from "next/image"

const statsData = [
    {
        value: "120",
        label: "Media Count",
        gradient: "from-[#EBF6F2]"
    },
    {
        value: "24%",
        label: "Engagement",
        gradient: "from-[#FEF2EA]"
    },
    {
        value: "20M",
        label: "Avg. Like",
        gradient: "from-[#F0ECFB]"
    },
    {
        value: "150K",
        label: "Avg. Comments",
        gradient: "from-[#E3ECFF]"
    }
]

const data2 = {
    "reels": 45,
    "posts": 45,
    "stories": 10
}

const GeneralStats = () => {
    return (
        <div className="p-3 bg-[#FDFBFF] rounded-[14px] flex flex-col gap-3">
            <BlobChart data={data2}/>
            <div className="p-2 flex justify-between items-center border rounded-[10px]">
                <div className="flex flex-col gap-0.5 text-[10px]">
                    <div className="font-semibold">Upload Content Type</div>
                    <div className="font-medium text-[#8B39FF] underline">How to upload?</div>
                </div>
                <div className="border-[1px] border-[#E2E4E9] flex gap-0.5 px-[10px] py-1 rounded-full">
                    <div className="text-[10px] font-medium">Upload</div>
                    <Image src={UploadIcon} alt="Upload" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-1">
                {statsData.map((stat, index) => (
                    <div key={index} className={`w-full px-4 py-2 bg-gradient-to-r ${stat.gradient} to-[#FDFBFF] rounded-[10px]`}>
                        <div className="text-[#3D4966] font-bold">{stat.value}</div>
                        <div className="text-[#3D4966] font-medium text-[10px]">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GeneralStats