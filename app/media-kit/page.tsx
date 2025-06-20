'use client'
import { Header } from '@components/molecules/Header'
import MediaKitComingSoon from '@components/molecules/mediakit/MediaKitComingSoon'
import MediaKitReady from '@components/molecules/mediakit/MediaKitReady'
import { STORAGE_CONSTANTS } from '@utils/constants'
import { loadState } from '@utils/localStorage'
import { getUserDetails } from 'api/services'
import React, { useEffect, useState } from 'react'
import Screen from "@components/molecules/Screen";
import { useSearchParams } from 'next/navigation'

const MediaKit = () => {
  const searchParams = useSearchParams()
  const mediakitRef = searchParams.get('mediakitRef')
  const userId = loadState(STORAGE_CONSTANTS.userId)
  const [instaIdInput, setInstaIdInput] = useState('')

  return (
    <div className='bg-[#EAE9EC] min-h-screen'>
      <Header />

      {
          mediakitRef ? <MediaKitReady instaIdInput={instaIdInput} setInstaIdInput={setInstaIdInput} mediakitRef={mediakitRef} /> : <MediaKitComingSoon />
        }
    </div>
  )
}

export default MediaKit