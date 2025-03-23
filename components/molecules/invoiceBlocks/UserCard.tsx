import React from 'react'
import DodoIconCircle from "public/icons/dodoIconCircle.svg";
import Image from 'next/image';
import PenIcon from 'public/icons/EditPen.svg'
import { ClientDetailsProps, RecipientDetails } from 'types';

interface userCardProps {
    type: 'sender' | 'recipient'
    mode: 'edit' | 'view'
    userDetails: ClientDetailsProps | RecipientDetails
}

const UserCard = ({ type, mode, userDetails }: userCardProps) => {
    return (
        <div className='bg-white px-4 py-3 rounded-[10px] flex flex-col gap-2'>
            <div className='text-sm font-semibold flex justify-between'>
                {type === 'sender' ? 'From' : 'To'}
                {
                    mode === 'edit' && (
                        <div>
                            <Image src={PenIcon} alt='edit' width={20} height={20} />
                        </div>
                    )
                }
            </div>

            <div>
                <Image src={DodoIconCircle} alt='user' width={40} height={40} />
            </div>

            <div className='flex flex-col gap-[6px]'>
                <div className='font-semibold'> {userDetails.name} </div>
                <div className='flex flex-col gap-1 text-xs text-[#3D4966]'>
                    <div> {userDetails.address}, {userDetails.city}, {userDetails.state}, {userDetails.zipcode} </div>
                    <div> {userDetails.email} </div>
                    {/* <div> {userDetails} </div> */}
                    {userDetails.gst && <div> GSTN: {userDetails.gst} </div>}
                    {userDetails.pan && <div> PAN: {userDetails.pan} </div>}
                </div>
            </div>
        </div>
    )
}

export default UserCard