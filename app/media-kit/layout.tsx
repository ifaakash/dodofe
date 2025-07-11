import { Header } from '@components/molecules/Header'
import Footer from '@components/atoms/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Professional Media Kit Generator for Creators | Dodo',
    description: 'Create a stunning, brand-focused media kit in minutes. Share your influence professionally with auto-updating stats, brand collaborations, and engagement metrics. No downloads needed.',
    keywords: 'media kit generator, influencer media kit, creator media kit, professional media kit, brand collaboration, social media kit',
    openGraph: {
        title: 'Professional Media Kit Generator for Creators | Dodo',
        description: 'Create a stunning, brand-focused media kit in minutes. Share your influence professionally with auto-updating stats, brand collaborations, and engagement metrics.',
        images: ['/images/media-kit-og.jpg'],
    }
}

export default function MediaKitLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
} 