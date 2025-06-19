import { Input } from '@components/atoms'
import NewButton from '@components/atoms/Button/NewButton'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import EditPenIcon from "public/icons/EditPen.svg";
import Image from 'next/image'


const checkBoxList = [
    {
        label: 'Reel',
        value: false
    },
    {
        label: 'Story',
        value: false
    },
    {
        label: 'Post',
        value: false
    }
]

const AddBrandModal = ({ setIsAddBrandModelOpen }: { setIsAddBrandModelOpen: (isOpen: boolean) => void }) => {
    const [checkboxes, setCheckboxes] = useState(checkBoxList)
    const [link, setLink] = useState('')
    const [reach, setReach] = useState('')
    const [engagement, setEngagement] = useState('')

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsAddBrandModelOpen(false)
        }
    }

    const handleCheckboxChange = (index: number) => {
        const newCheckboxes = [...checkboxes]
        newCheckboxes[index].value = !newCheckboxes[index].value
        setCheckboxes(newCheckboxes)
    }

    const isFormValid = () => {
        return checkboxes.some(cb => cb.value) && link.trim() !== ''
    }

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end justify-center animate-fadeIn p-[10px]"
            onClick={handleBackdropClick}
        >
            <div className='bg-[#FDFBFF] p-5 rounded-lg w-full flex flex-col gap-4 ease-in-out animate-slideUp transform transition-transform duration-300 '>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-1 text-2xl font-bold'>
                        <div> Add </div>
                        <div className=' bg-gradient-to-r from-[#F37E57] to-[#EF3576] bg-clip-text text-transparent'>
                            Brand
                        </div>
                    </div>
                    <X size={16} className='cursor-pointer' onClick={() => setIsAddBrandModelOpen(false)} />
                </div>
                <div className='text-[#0092DB] text-[10px] font-medium bg-[#E5F6FF] px-[10px] py-[6px] rounded-[10px]'>
                    Your Past Brand colloboration details, helps you to statnd out and get more Brands.
                </div>
                <div className='flex p-2 gap-3 border border-[E2E4E9] rounded-xl'>
                    <div className='flex items-center gap-2'>
                      
                        <div className='text-[#3D4966] font-medium'> Brand Name </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Image src={EditPenIcon} alt='edit-pen' width={24} height={24} className='cursor-pointer' />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-bold'>Content type</div>
                    <div className='flex gap-2'>
                        {checkboxes.map((item, index) => (
                            <CheckBox
                                key={index}
                                label={item.label}
                                value={item.value}
                                onChange={() => handleCheckboxChange(index)}
                            />
                        ))}
                    </div>
                    <input
                        type='text'
                        placeholder='Link'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className='placeholder:text-xs placeholder:text-[#8994A9] text-xs w-full border border-[#EAE9EC] rounded-[10px] p-[14px] outline-none'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-bold'>  Insight <span className='text-[#979EAD]'>(OPTIONAL)</span> </div>
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            placeholder='Reach'
                            value={reach}
                            onChange={(e) => setReach(e.target.value)}
                            className='placeholder:text-xs placeholder:text-[#8994A9] text-xs w-full border border-[#EAE9EC] rounded-[10px] p-[14px] outline-none'
                        />
                        <input
                            type='text'
                            placeholder='Engagement'
                            value={engagement}
                            onChange={(e) => setEngagement(e.target.value)}
                            className='placeholder:text-xs placeholder:text-[#8994A9] text-xs w-full border border-[#EAE9EC] rounded-[10px] p-[14px] outline-none'
                        />
                    </div>
                </div>

                <div className='flex justify-end'>
                    <NewButton
                        variant={isFormValid() ? "primary" : "disabled"}
                        size="large"
                        onClick={() => {
                            if (isFormValid()) {
                                // Handle form submission
                                setIsAddBrandModelOpen(false)
                            }
                        }}
                        className="w-full"
                    >
                        Add now
                    </NewButton>
                </div>
            </div>
        </div>
    )
}

const CheckBox = ({
    label,
    value,
    onChange
}: {
    label: string,
    value: boolean,
    onChange: (value: boolean) => void
}) => {
    return (
        <div className='flex items-center gap-1 justify-between px-[10px] py-2 border border-[#EAE9EB] rounded-[10px] w-full'>
            <div className='text-[#414D55] font-medium text-sm'> {label} </div>
            <input
                type='checkbox'
                checked={value}
                onChange={() => onChange(!value)}
                className="w-4 h-4 accent-[#8B39FF]"
            />
        </div>
    )
}

export default AddBrandModal