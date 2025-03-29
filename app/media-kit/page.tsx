'use client'
import { Header } from '@components/molecules/Header'
import React from 'react'
import NewButton from '@components/atoms/Button/NewButton'
import cx from 'classnames';
import Image from 'next/image';
import MediaKitOnboarding from 'public/assets/MediaKitWaiting.png'
import LineWithDot from 'public/assets/LineWithDot.svg'
import { CheckCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti'


const MediaKit = () => {
  const router = useRouter();

  const handleJoinWaitlist = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        y: 0.7
      }
    })
    router.push('/media-kit/waitlist')
  }
  return (
    <div className='bg-[#EAE9EC] min-h-screen'>
      <Header />

      <div className='pt-20 px-5 pb-24 flex justify-center'>
        <div className='flex flex-col gap-20 items-center'>
          <div className='relative flex items-center justify-center flex-col'>
            <Image src={MediaKitOnboarding} alt='media-kit' />
            <div className='flex flex-col items-center text-center gap-2 absolute -bottom-12'>
              <div className='text-2xl font-bold flex flex-col gap-1'>
                <span className='leading-none'>Dodo Media Kit is</span>
                <span className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] bg-clip-text text-transparent leading-none" >
                  Coming Soon!
                </span>

              </div>


              <div className='text-xs px-2 max-w-sm'>
                A powerful way for creators to showcase their stats, audience insights, and brand collaborations—all in one place.
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-[10px]'>
            <div className='flex items-center gap-2'>
              <Image src={LineWithDot} alt='line-with-dot' />
              <span className='font-semibold text-[#3D4966]'>
                What's Coming?
              </span>
              <Image src={LineWithDot} alt='line-with-dot' className='rotate-180' />
            </div>

            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 text-xs text-[#3D4966]'>
                <CheckCheck size={16} />
                Auto-Generated Media Kits 
              </div>

              <div className='flex items-center gap-2 text-xs text-[#3D4966]'>
                <CheckCheck size={16} />
                Real-Time Analytics
              </div>

              <div className='flex items-center gap-2 text-xs text-[#3D4966]'>
                <CheckCheck size={16} />
                Professional & Customizable
              </div>
            </div>
          </div>
        </div>

        <div className={cx("fixed bottom-0 py-4 w-[90%] bg-[#EAE9EC]")}>
          <NewButton
            size="large"
            variant="primary"
            className="w-full"
            onClick={handleJoinWaitlist}
          >
            Join the Waitlist
          </NewButton>
        </div>
      </div>
    </div>
  )
}

export default MediaKit