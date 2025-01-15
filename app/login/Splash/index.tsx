import Image from "next/image";
import dodoLogo from "public/icons/dodo.svg";
import { useEffect } from "react";

export const Splash = ({ setLoginState }: any) => {

  useEffect(() => {
    setTimeout(() => {
      setLoginState(1);
    }, 3000)
  }, [])

  return (
    <div className="bg-theme-3 h-screen flex justify-center items-center">
      <Image height={100} width={100} src={dodoLogo} alt="user profile" />
    </div>
  );
};
