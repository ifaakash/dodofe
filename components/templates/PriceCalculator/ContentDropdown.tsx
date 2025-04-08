'use client'

import { ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  { name: "tech", code: "#ffffff", emoji: "💻" },
  { name: "entertainment", code: "#d83248", emoji: "🎥" },
  { name: "food", code: "#d83248", emoji: "🍔" },
  { name: "finance", code: "#d83248", emoji: "💰" },
  { name: "comedy", code: "#d83248", emoji: "🤣" },
  { name: "beauty", code: "#d83248", emoji: "💄" },
  { name: "travel", code: "#d83248", emoji: "🌍" },
  { name: "sports", code: "#d83248", emoji: "🏃‍♂️" },
  { name: "gaming", code: "#d83248", emoji: "🎮" },
  { name: "diy", code: "#d83248", emoji: "🔨" },
  { name: "vlogger", code: "#d83248", emoji: "📸" },
  { name: "gym & fitness", code: "#d83248", emoji: "🏋️‍♂️" },
  { name: "educator", code: "#d83248", emoji: "🎓" },
  { name: "dancer", code: "#d83248", emoji: "💃" },
  { name: "singer", code: "#d83248", emoji: "🎤" },
  { name: "doctor", code: "#d83248", emoji: "🩺" },
  { name: "motivational", code: "#d83248", emoji: "💪" },
  { name: "real estate", code: "#d83248", emoji: "🏠" },
  { name: "home design", code: "#d83248", emoji: "🏠" },
  { name: "Other", code: "#d83248", emoji: "👀" },
]

const ContentDropdown = ({ contentNiche, setContentNiche }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on click away
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='flex flex-col gap-3 relative' ref={dropdownRef}>
      <div className='text-sm font-medium text-[#5E6C84] text-center'>
        Select your Content niche
      </div>

      <div>
        <div
          className='border-[#E2E4E9] border-[2px] py-[10px] px-3 rounded-lg flex justify-between items-center cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className='text-sm font-medium capitalize flex gap-4 items-center'>
            <span> {categories.find(c => c.name === contentNiche)?.emoji}</span> <span>{contentNiche || 'Select'}</span>
          </div>
          <ChevronDown width={16} height={16} strokeWidth={2} />
        </div>

        {/* Dropdown Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className='absolute mt-2 w-full bg-[#f1f2f4] rounded-lg z-10 max-h-60 overflow-y-auto'
            >
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => {
                    setContentNiche(category.name)
                    setIsOpen(false)
                  }}
                  className={`px-3 py-2 text-sm font-medium cursor-pointer hover:bg-[#d4d6db] rounded-lg transition-colors duration-150 capitalize flex items-center gap-2 ${contentNiche === category.name ? 'bg-[#d4d6db]' : ''
                    }`}
                >
                  <span>{category.emoji}</span> <span className='text-xs'>{category.name}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ContentDropdown
