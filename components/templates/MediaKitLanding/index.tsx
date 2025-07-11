'use client'
import { useRouter } from 'next/navigation'
import { ROUTE_CONSTANTS } from '@utils/constants'
import { motion } from 'framer-motion'
import Image from 'next/image'

const MediaKitLanding = () => {
    const router = useRouter()

    return (
        <div className="overflow-hidden bg-white">
            {/* Hero Section */}
            <section className="relative min-h-screen bg-[#FDF8FF] overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                background: i % 2 === 0 ? 'linear-gradient(45deg, #FF8FE2, #FFC27D)' : 'linear-gradient(45deg, #7C4DFF, #FF8FE2)',
                                width: Math.random() * 200 + 100,
                                height: Math.random() * 200 + 100,
                                filter: 'blur(100px)',
                                opacity: 0.04,
                                top: `${(i * 25) % 100}%`,
                                left: `${(i * 30) % 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                scale: [1, 1.1, 1],
                                opacity: [0.04, 0.06, 0.04],
                            }}
                            transition={{
                                duration: 8 + Math.random() * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </div>

                <div className="relative container mx-auto px-4 pt-20 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Content */}
                        <div className="text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8"
                            >
                                <motion.p
                                    className="text-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text font-medium mb-6"
                                    animate={{
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{ backgroundSize: '200% auto' }}
                                >
                                    From audience insights to brand collabs, pricing to reach...
                                </motion.p>
                                <div className="relative">
                                    <motion.h1
                                        className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        It's all here in your
                                    </motion.h1>
                                    <motion.div
                                        className="relative inline-block"
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <span className="text-4xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text block leading-none">
                                            MEDIA KIT
                                        </span>
                                        <div className="absolute -right-12 -top-8 transform rotate-12">
                                            <span className="text-5xl">✨</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Feature Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-2 gap-4 mb-8"
                            >
                                <motion.div
                                    className="bg-white rounded-2xl p-4 shadow-[0_0_50px_rgba(124,77,255,0.1)] hover:shadow-[0_0_50px_rgba(124,77,255,0.2)] transition-all"
                                    whileHover={{ y: -5 }}
                                >
                                    <span className="text-3xl mb-3 block">🔗</span>
                                    <p className="text-gray-800 font-medium text-lg">Share your MediaKit link</p>
                                </motion.div>
                                <motion.div
                                    className="bg-white rounded-2xl p-4 shadow-[0_0_50px_rgba(255,143,226,0.1)] hover:shadow-[0_0_50px_rgba(255,143,226,0.2)] transition-all"
                                    whileHover={{ y: -5 }}
                                >
                                    <span className="text-3xl mb-3 block">📈</span>
                                    <p className="text-gray-800 font-medium text-lg">Track views in real-time</p>
                                </motion.div>
                                <motion.div
                                    className="bg-white rounded-2xl p-4 shadow-[0_0_50px_rgba(255,194,125,0.1)] hover:shadow-[0_0_50px_rgba(255,194,125,0.2)] transition-all"
                                    whileHover={{ y: -5 }}
                                >
                                    <span className="text-3xl mb-3 block">👑</span>
                                    <p className="text-gray-800 font-medium text-lg">Stay in control of your brand</p>
                                </motion.div>
                                <motion.div
                                    className="bg-white rounded-2xl p-4 shadow-[0_0_50px_rgba(124,77,255,0.1)] hover:shadow-[0_0_50px_rgba(124,77,255,0.2)] transition-all"
                                    whileHover={{ y: -5 }}
                                >
                                    <span className="text-3xl mb-3 block">💫</span>
                                    <p className="text-gray-800 font-medium text-lg">Make brands choose you</p>
                                </motion.div>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative inline-block"
                            >
                                {/* <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(ROUTE_CONSTANTS.LOGIN)}
                  className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                >
                  Create Your Media Kit
                </motion.button> */}
                                {/* <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -right-12 -top-8 transform rotate-12"
                >
                  <span className="text-3xl">🚀</span>
                </motion.div> */}
                            </motion.div>
                        </div>

                        {/* Right Side - Visual */}
                        <div className="relative">
                            {/* Main Media Kit Preview */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, rotate: -5 }}
                                animate={{ opacity: 1, y: 0, rotate: -5 }}
                                transition={{ delay: 0.3 }}
                                className="relative z-20"
                            >
                                <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-[2px] rounded-3xl shadow-2xl">
                                    <div className="bg-white rounded-[23px] p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-500" />
                                            <div className="flex-1">
                                                <div className="h-4 w-32 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-2" />
                                                <div className="h-3 w-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                                                <div className="h-4 w-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-2" />
                                                <div className="h-8 w-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full" />
                                            </div>
                                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                                                <div className="h-4 w-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-2" />
                                                <div className="h-8 w-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-3 w-full bg-gradient-to-r from-purple-100 to-pink-100 rounded-full" />
                                            <div className="h-3 w-5/6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full" />
                                            <div className="h-3 w-4/6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Background Elements */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute top-20 -right-10 z-10 transform rotate-12"
                            >
                                <div className="bg-gradient-to-br from-orange-400 to-yellow-300 p-[2px] rounded-3xl w-48 h-48">
                                    <div className="bg-white rounded-[23px] p-6 h-full">
                                        <div className="h-full bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                className="absolute -bottom-10 -left-10 z-0 transform -rotate-12"
                            >
                                <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-[2px] rounded-3xl w-40 h-40">
                                    <div className="bg-white rounded-[23px] p-6 h-full">
                                        <div className="h-full bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            Everything you need in one place
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
                        >
                            Showcase your influence with powerful features designed for creators
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "📊",
                                title: "Analytics Dashboard",
                                description: "Track your growth and engagement metrics in real-time"
                            },
                            {
                                icon: "🎯",
                                title: "Target Audience",
                                description: "Show brands exactly who your content reaches"
                            },
                            {
                                icon: "💰",
                                title: "Pricing Cards",
                                description: "Set clear pricing for different collaboration types"
                            },
                            {
                                icon: "📱",
                                title: "Social Proof",
                                description: "Display your best performing content and campaigns"
                            },
                            {
                                icon: "🔄",
                                title: "Auto Updates",
                                description: "Your stats stay fresh with automatic updates"
                            },
                            {
                                icon: "🎨",
                                title: "Custom Design",
                                description: "Make your media kit match your personal brand"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-[0_0_50px_rgba(124,77,255,0.1)] hover:shadow-[0_0_50px_rgba(124,77,255,0.2)] transition-all"
                                whileHover={{ y: -5 }}
                            >
                                <span className="text-3xl mb-4 block">{feature.icon}</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative py-20 bg-[#FDF8FF]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                            >
                                Create your Media Kit in minutes
                            </motion.h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        number: "01",
                                        title: "Enter your Instagram ID",
                                        description: "Enter your Instagram ID to import your stats automatically"
                                    },
                                    {
                                        number: "02",
                                        title: "Customize your Media Kit",
                                        description: "Add audience demographics, achievements, and showcase your best work"
                                    },
                                    {
                                        number: "03",
                                        title: "Share with brands",
                                        description: "Get a professional link to share with potential collaborators"
                                    }
                                ].map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                        className="flex gap-6"
                                    >
                                        <div className="flex-shrink-0">
                                            <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text font-bold text-xl">
                                                {step.number}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-br from-purple-600 to-pink-500 p-[2px] rounded-3xl shadow-2xl"
                            >
                                <div className="bg-white rounded-[23px] p-8">
                                    <div className="space-y-4">
                                        <div className="h-4 w-3/4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full" />
                                        <div className="h-4 w-1/2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full" />
                                        <div className="h-4 w-2/3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full" />
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-10 -right-10 z-10 transform rotate-12"
                            >
                                <div className="bg-gradient-to-br from-orange-400 to-yellow-300 p-[2px] rounded-3xl w-32 h-32">
                                    <div className="bg-white rounded-[23px] p-4 h-full">
                                        <div className="h-full bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            Loved by Creators
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
                        >
                            Join thousands of creators who've elevated their brand
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "Got 3 brand deals in my first month using this media kit!",
                                author: "Sarah K.",
                                role: "Fashion Creator"
                            },
                            {
                                quote: "The analytics dashboard is a game-changer for pitching to brands.",
                                author: "Mike R.",
                                role: "Tech Reviewer"
                            },
                            {
                                quote: "Finally, a professional way to showcase my influence.",
                                author: "Lisa M.",
                                role: "Lifestyle Blogger"
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-[0_0_50px_rgba(124,77,255,0.1)] hover:shadow-[0_0_50px_rgba(124,77,255,0.2)] transition-all"
                                whileHover={{ y: -5 }}
                            >
                                <div className="mb-4">
                                    {"⭐️".repeat(5)}
                                </div>
                                <p className="text-gray-800 mb-4 text-lg">{testimonial.quote}</p>
                                <div>
                                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                                    <p className="text-gray-600">{testimonial.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 bg-[#FDF8FF]">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                        >
                            Ready to showcase your influence?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-600 mb-8"
                        >
                            Join creators who are winning more brand deals with professional media kits
                        </motion.p>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push(ROUTE_CONSTANTS.LOGIN)}
                            className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                        >
                            Create Your Media Kit
                        </motion.button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MediaKitLanding 