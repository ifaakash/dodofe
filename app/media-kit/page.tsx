'use client'
import { Header } from '@components/molecules/Header'
import MediaKitComingSoon from '@components/molecules/mediakit/MediaKitComingSoon'
import MediaKitReady from '@components/molecules/mediakit/MediaKitReady'
import React, { useState } from 'react'

const MediaKit = () => {
  const mediakitRef = 'keshavvv'
  const [instaIdInput, setInstaIdInput] = useState('')

  return (
    <div className='bg-[#EAE9EC] min-h-screen'>
      <Header />

      {
        mediakitRef ? <MediaKitReady instaIdInput={instaIdInput} setInstaIdInput={setInstaIdInput} /> : <MediaKitComingSoon />
      }


    </div>
  )
}

export default MediaKit