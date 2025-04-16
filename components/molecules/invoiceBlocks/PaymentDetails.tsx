import React from 'react'
import Image from 'next/image'
import PenIcon from 'public/icons/EditPen.svg'
import { BankDetails } from 'types/index'

interface PaymentDetailsProps {
  mode: 'edit' | 'view'
  bankDetails: BankDetails
  handleEditNagigation?: any
}


const PaymentDetails = ({ mode, bankDetails, handleEditNagigation }: PaymentDetailsProps) => {
  return (
    <div className='px-4 py-3 bg-white rounded-[10px] flex flex-col gap-2'>
      <div className='flex justify-between'>
        <div className='text-sm font-semibold'> PAYMENT DETAILS </div>
        {
          mode === 'edit' && (
            <div className='cursor-pointer' onClick={() => handleEditNagigation({ section: 'paymentDetails' })}>
              <Image src={PenIcon} alt='edit' width={20} height={20} />
            </div>
          )
        }
      </div>
      <div className='flex flex-col gap-[10px]'>
        <div className='flex justify-between'>
          <div className='text-sm'> Bank Name </div>
          <div className='text-sm font-medium'> {bankDetails.bankName} </div>
        </div>
        <div className='flex justify-between'>
          <div className='text-sm'> Account Number </div>
          <div className='text-sm font-medium'> {bankDetails.accountNumber} </div>
        </div>
        <div className='flex justify-between'>
          <div className='text-sm'> IFSC Code </div>
          <div className='text-sm font-medium'> {bankDetails.ifscCode} </div>
        </div>
        <div className='flex justify-between'>
          <div className='text-sm'> Account Holder Name </div>
          <div className='text-sm font-medium'> {bankDetails.accountName} </div>
        </div>
      </div>
      {
        bankDetails.upiId && (
          <div className="border-b border-dotted border-[#EAE9EC] py-[10px]">
            <div className='flex justify-between'>
              <div className='text-sm'> UPI ID </div>
              <div className='text-sm font-medium'> {bankDetails.upiId} </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default PaymentDetails