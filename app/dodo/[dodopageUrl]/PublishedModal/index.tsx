import MiddleModal from "@components/molecules/MiddleModal";
import Image from "next/image";
import cx from "classnames";

import styles from "./publishedModal.module.css";

import PublishedSuccessImg from "public/assets/published.png";
import CopyBox from "@components/molecules/CopyBox";

const PublishedModal = ({ isOpened, setIsOpened, url }: { isOpened: boolean, setIsOpened: (isOpened: boolean) => void, url: string }) => {
    const onCLose = () => {
        localStorage.removeItem("persist:root");
        window.location.href = `/dodo/${url}`;
    };

    return (
        <MiddleModal isOpened={isOpened} setIsOpened={setIsOpened} onClose={onCLose} modalStyle={{ background: 'linear-gradient(171deg, rgba(254,243,205,1) 0%, rgba(251,208,226,1) 50%, rgba(224,212,247,1) 100%)' }}>
            <div className="absolute-center flex-col">
                <div className="mt-6">
                    <Image src={PublishedSuccessImg} height={250} alt="Published Success" />
                </div>

                <h1 className={cx(styles.title, 'font-semibold text-2xl')}>Yayy!</h1>
                <p className={cx(styles.description, 'font-medium text-base my-2')}>New changes published.</p>

                <CopyBox text={`https://dodoclub.in/${url}`} subText={`dodoclub.in/${url}`} />
            </div>
        </MiddleModal >

    );
};

export default PublishedModal;