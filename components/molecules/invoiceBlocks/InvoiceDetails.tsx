import React from 'react'
import PenIcon from 'public/icons/EditPen.svg'
import Image from 'next/image'
import { formatDateLong } from '@utils/helperFunctions'

interface InvoiceDetailsProps {
  mode: 'edit' | 'view'
  invoiceNumber: string
  dueDate: string
}


const InvoiceDetails = ({ mode, invoiceNumber, dueDate }: InvoiceDetailsProps) => {
  
  return (
    <div className='bg-white rounded-[10px] py-3 px-4 flex justify-between'>
      <div>
        <div className='text-[#3D4966] text-sm'>
        Invoice number
        </div>
        <div className='font-semibold'>
        {invoiceNumber}
        </div>
      </div>

      <div className={`flex items-center ${mode === 'edit' && 'gap-6'}`}>
        <div>
          <div className='text-[#3D4966] text-sm text-end' >
          Due Date
          </div>
          <div className='font-semibold text-end'>
          {formatDateLong(dueDate)}
          </div>
        </div>

        <div>
          {
            mode === 'edit' && (
              <div>
                <Image src={PenIcon} alt='pen' width={20} height={20} />
              </div>
            )
          }
        </div>
      </div>



    </div>
  )
}

export default InvoiceDetails