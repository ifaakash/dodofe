"use client"
import { BLOGS } from "@utils/constants";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Blogs() {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen bg-white text-black font-sans">

            {/* Hero Section */}
            <section className="w-full bg-green-100 py-24 text-center px-6">
                <h1 className="text-5xl font-extrabold mb-4 tracking-tight">dodoblogs</h1>
                <p className="text-xl max-w-2xl mx-auto text-gray-700 italic">
                    "From vibe to value — everything an influencer needs to know."
                </p>
            </section>

            {/* Blog Cards */}
            <section className="w-full py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {Object.values(BLOGS).map((blog, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => router.push(`/blogs/${blog.id}`)}
                            className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                        >
                            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                                <p className="text-gray-600 text-sm">{blog.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
