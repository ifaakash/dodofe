import React from 'react';
import Image from 'next/image';
// import ErrorImage from 'public/assets/error.png'; // Replace with your error image path

const ErrorPage = ({ message }: { message?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* <Image src={ErrorImage} alt="Error" width={200} height={200} /> */}
            <h1 className="text-3xl font-bold text-red-600 mt-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-700 mt-2">
                {message || "An unexpected error has occurred. Please try again later."}
            </p>
            <button
                onClick={() => window.location.reload()}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Refresh Page
            </button>
        </div>
    );
};

export default ErrorPage;