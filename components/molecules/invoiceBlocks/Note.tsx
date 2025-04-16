import React from 'react'
import Image from 'next/image'
import PenIcon from 'public/icons/EditPen.svg'

interface NoteProps {
  mode: 'edit' | 'view'
  note: string
  handleEditNagigation?: any
}

const Note = ({ mode, note, handleEditNagigation }: NoteProps) => {
  return (
    <div className={`px-4 py-3 bg-white rounded-[10px] flex flex-col gap-2 ${mode === 'view' ? 'border border-[#E2E4E9]' : ''}`}>
      <div className='flex justify-between'>
        <div className='text-sm font-semibold'> NOTE </div>
        {
          mode === 'edit' && (
            <div onClick={() => handleEditNagigation({ section: 'invoiceDetails' })}>
              <Image src={PenIcon} alt='edit' width={20} height={20} />
            </div>
          )
        }
      </div>
      <div className='text-sm break-words whitespace-pre-wrap overflow-hidden'>
        {note}
      </div>
    </div>
  )
}

export default Note