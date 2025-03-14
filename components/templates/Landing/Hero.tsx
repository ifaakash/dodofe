import Image from 'next/image';

const Hero = () => {
    return (
        <section className="h-screen flex flex-col justify-between snap-start">
            {/* Header */}
            <div className="flex-none p-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Header
                </h1>
            </div>
            {/* Title and Button */}
            <div className="flex-none text-center">
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    Welcome to Our Landing Page
                </h2>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
                    Call to Action
                </button>
            </div>
            {/* Full-viewport Image */}
            <div className="flex-grow">
                <Image
                    src="/placeholder-image.jpg"
                    alt="Placeholder"
                    objectFit="cover"
                    className="rounded-lg"
                />
            </div>
        </section>
    );
};

export default Hero;