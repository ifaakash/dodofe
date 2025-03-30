import { Button } from "@components/atoms";
import Modal from "@components/molecules/Modal";
import { ROUTE_CONSTANTS } from "@utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import logoutSad from 'public/assets/logout_sad.png'

import { hideLogoutModalState } from 'store/slice/commonSlice';
import NewButton from "@components/atoms/Button/NewButton";

const LogoutModal = ({ isModalOpen }: { isModalOpen: boolean }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear();
        dispatch({ type: 'RESET_STORE' });
        dispatch(hideLogoutModalState());
        router.push(ROUTE_CONSTANTS.LOGIN);
    }

    const handleCancel = () => {
        dispatch(hideLogoutModalState());
    }

    return isModalOpen && (
        <Modal showOuterCloseIcon visible={isModalOpen} onClose={handleCancel} showCloseIcon={false} isBackgroundBlur>
            <>
                <p className="text-xl mt-2 font-bold clr-dark-text">Wait, why are you leaving? </p>

                <div className="flex flex-row gap-2 items-center justify-between mb-8 mt-2">
                    <Image
                        height={100}
                        width={80}
                        src={logoutSad}
                        alt="logoutSad"
                        // className="ml-4"
                        style={{ height: '80px' }}
                        onClick={() => {
                            router.back()
                        }}
                    />
                    <p className="mt-2 text-base leading-tight">Give us one more chance to make things awesome for you! </p>
                </div>
                <div className="flex justify-center gap-2 w-full">
                    <button className="w-full rounded-full border-[1px] border-red-500 text-sm font-medium" onClick={handleLogout}>
                        Logout
                    </button>
                    <button className="w-full rounded-full py-3 border-[1px] border-brandPrimary bg-brandPrimary text-white" onClick={handleCancel}> Cancel </button>
                </div>
            </>
        </Modal>
    );
}

export default LogoutModal;