'use client'
import { Header } from '@components/molecules/Header'
import MediaKitComingSoon from '@components/molecules/mediakit/MediaKitComingSoon'
import MediaKitReady from '@components/molecules/mediakit/MediaKitReady'
import { STORAGE_CONSTANTS, ROUTE_CONSTANTS } from '@utils/constants'
import { loadState } from '@utils/localStorage'
import { getUserDetails, updateMediaKit } from 'api/services'
import React, { useEffect, useState } from 'react'
import Screen from "@components/molecules/Screen";
import { useSearchParams, useRouter } from 'next/navigation'
import { userDetailsProps } from 'types'

const MediaKit = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const mediakitRef = searchParams.get('mediakitRef')
  const userId = loadState(STORAGE_CONSTANTS.userId)
  const [instaIdInput, setInstaIdInput] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null)


  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true)
      const response = await getUserDetails(userId as string)
      setUserDetails(response.user)
      setIsLoading(false)
    }
    fetchUserDetails()

  }, [])

  useEffect(() => {
    if (!isLoading && userDetails?.mediaKit) {
      router.push(ROUTE_CONSTANTS.MEDIA_KIT_CONSOLE)
    }
  }, [isLoading, userDetails?.mediaKit, router])

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