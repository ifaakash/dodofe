import { formatCurrency, formatCurrencyInWords } from '@utils/helperFunctions'
import React from 'react'
import Image from 'next/image'
import PenIcon from 'public/icons/EditPen.svg'
import { InvoiceItem } from 'types'

interface ItemsDetailsProps {
  mode: 'edit' | 'view'
  items: InvoiceItem[]
  discount: number
  gst: number
  tds: number
  handleEditNagigation?: any
}

const ItemsDetails = ({ mode, items, discount, gst, tds, handleEditNagigation }: ItemsDetailsProps) => {

  console.log('items', items)
  return (
    <div className='flex flex-col'>
      <div className='bg-white pt-3 pb-4 px-4 rounded-t-[10px]'>
        <div className='flex justify-between'>
          <div className='text-sm font-semibold'>
            ITEMS
          </div>
          <div>
            {
              mode === 'edit' && (
                <div className='cursor-pointer' onClick={() => handleEditNagigation({ section: 'items' })}>
                  <Image src={PenIcon} alt='edit' width={20} height={20} />
                </div>
              )
            }
          </div>
        </div>
        <div className=''>
          {
            items?.map((item, index) => (
              <div key={item._id}>
                <div className='flex justify-between py-[10px]'>
                  <div className='flex flex-col gap-1'>
                    <div className='text-[#3D4966] text-sm font-semibold'> {item.name} </div>
                    <div className='text-[#3D4966] text-xs'> {item.quantity} x {formatCurrency(item.price)} </div>
                  </div>
                  <div className='font-semibold text-sm flex items-end'>
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
                {index < items.length - 1 && (
                  <div className="border-b border-dotted border-[#EAE9EC]"></div>
                )}
              </div>
            ))
          }
          <div className="border-b border-solid border-[#E2E4E9]"></div>
          <div className='flex justify-between py-[10px]'>
            <div className='text-[#3D4966] text-sm font-semibold'>
              Sub-Total
            </div>
            <div className='font-semibold text-sm flex items-end'>
              {formatCurrency(items.reduce((acc, item) => acc + item.price * item.quantity, 0))}
            </div>
          </div>
          <div className="border-b border-dotted border-[#EAE9EC]"></div>


          {/* Tax, Discount, TDS Details */}
          <div className='flex flex-col gap-2' style={{ marginTop: discount > 0 || gst > 0 || tds > 0 ? '10px' : '0px' }}>
            {
              discount > 0 && (
                <div className='flex justify-between pt-[10px]'>
                  <div className='text-[#3D4966] text-sm font-medium'>
                    Discount
                  </div>
                  <div className='font-medium text-sm flex items-end'>
                    {discount}%
                  </div>
                </div>
              )
            }

            {
              gst > 0 && (
                <div className='flex justify-between pt-[10px]'>
                  <div className='text-[#3D4966] text-sm font-medium'>
                    GST
                  </div>
                  <div className='font-medium text-sm flex items-end'>
                    {gst}%
                  </div>
                </div>

              )
            }

            {
              tds > 0 && (
                <div className='flex justify-between pt-[10px]'>
                  <div className='text-[#3D4966] text-sm font-medium'>
                    TDS
                  </div>
                  <div className='font-medium text-sm flex items-end'>
                    {tds}%
                  </div>
                </div>
              )
            }
          </div>


        </div>
      </div>

      <div className='bg-black text-white px-4 pb-3 pt-4 rounded-b-[10px] flex flex-col gap-2'>
        <div className='flex justify-between'>
          <div> Grand Total </div>
          <div className='text-white font-semibold'>
            {formatCurrency(
              Math.floor(
                items.reduce((acc, item) => acc + item.price * item.quantity, 0) -
                (items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.1)
              )
            )}
          </div>
        </div>
        <div className='text-end font-medium text-xs'>
          {formatCurrencyInWords(
            Math.floor(
              items.reduce((acc, item) => acc + item.price * item.quantity, 0) -
              items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.1
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemsDetails