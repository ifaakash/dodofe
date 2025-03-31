'use client'

import { ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const options = ['Fashion', 'Technology', 'Health', 'Finance', 'Travel']

const ContentDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Fashion')
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
          className='bg-[#E2E4E9] py-[10px] px-3 rounded-lg flex justify-between items-center cursor-pointer'
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className='text-sm font-medium'>
            {selected}
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
              className='absolute mt-2 w-full bg-[#E2E4E9] rounded-lg shadow-md z-10'
            >
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelected(option)
                    setIsOpen(false)
                  }}
                  className={`px-3 py-2 text-sm font-medium cursor-pointer hover:bg-[#d4d6db] rounded-lg transition-colors duration-150 ${
                    selected === option ? 'bg-[#d4d6db]' : ''
                  }`}
                >
                  {option}
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
