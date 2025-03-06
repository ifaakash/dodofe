import { useSelector } from 'react-redux';

const useLoaderVisibility = () => {
    return useSelector((state: any) => state.loader);
};

export default useLoaderVisibility;