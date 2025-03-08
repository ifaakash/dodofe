import Image from "next/image";
import { useRouter } from "next/navigation";
import leftArrow from "public/icons/leftArrow.svg";

interface HeaderProps {
    title?: string;
    subtitle?: string;
    onBackClick?: () => void;
}

export const Header = ({
    title,
    subtitle,
    onBackClick,
}: HeaderProps) => {
    const router = useRouter();

    return (
        <div className="h-16 flex pt-6 fixed top-0 left-0 flex-row items-center w-full bg z-50">
            <Image
                height={20}
                width={20}
                src={leftArrow}
                alt="back arrow"
                className="ml-4 cursor-pointer"
                onClick={() => {
                    if (onBackClick) {
                        onBackClick();
                    } else {
                        router.back();
                    }
                }}
            />

            <div className="flex flex-col ml-4">
                <span className="text-lg font-bold">{title}</span>
                {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
            </div>

            <div className="flex-grow"></div>
        </div>
    );
};