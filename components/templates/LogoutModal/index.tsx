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

                    {/* KESHAV TODO: FIX UI */}
                    <Button
                        size="medium"
                        className="w-full rounded-[10px] py-3 px-4"
                        variant="contained"
                        onClick={handleCancel}
                        text="Cancel"
                    />
                    <Button
                        size="medium"
                        className="w-full rounded-[10px] py-3 px-4"
                        variant="outline"
                        onClick={handleLogout}
                        text="Logout"
                        btnColor="theme-1"
                    />
                </div>
            </>
        </Modal>
    );
}

export default LogoutModal;