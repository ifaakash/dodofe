import { Input } from '@components/atoms'
import NewButton from '@components/atoms/Button/NewButton'
import { Trash2, X } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import EditPenIcon from "public/icons/EditPen.svg";
import Image from 'next/image'
import AddImageIcon from "public/icons/addImage.svg";
import { addBrandCollaboration, updateMediaKitBrand, deleteBrandCollaboration } from 'api';
import { toast } from 'react-toastify';

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

const BrandModal = ({
    setIsAddBrandModelOpen,
    setAllBrandData,
    allBrandData,
    variant,
    instaId
}: {
    setIsAddBrandModelOpen: (isOpen: boolean) => void,
    setAllBrandData?: (data: any) => void,
    allBrandData?: any,
    variant: 'add' | 'edit',
    instaId?: string
}) => {
    // Initialize form data based on variant
    const getInitialFormData = () => {
        if (variant === 'edit' && allBrandData) {
            // Parse content types from existing data
            const existingContentTypes = allBrandData.contentType?.split(',') || []
            const checkboxes = checkBoxList.map(item => ({
                ...item,
                value: existingContentTypes.includes(item.label)
            }))

            return {
                brandName: allBrandData.brandName || '',
                brandLogo: allBrandData.brandLogo || '',
                brandLogoFile: null,
                checkboxes: checkboxes,
                link: allBrandData.contentUrl || '',
                reach: allBrandData.reach || '',
                engagement: allBrandData.engagement || '',
            }
        }

        return {
            brandName: '',
            brandLogo: '',
            brandLogoFile: null,
            checkboxes: checkBoxList,
            link: '',
            reach: '',
            engagement: '',
        }
    }

    const [brandFormData, setBrandFormData] = useState(getInitialFormData())
    const [brandLogoFile, setBrandLogoFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [brandNameEditing, setBrandNameEditing] = useState(false)

    // Store original data for comparison when editing
    const [originalData, setOriginalData] = useState(allBrandData)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        if (variant === 'edit') {
            setBrandNameEditing(true)
            setOriginalData(allBrandData)
        }
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
        const newCheckboxes = [...brandFormData.checkboxes]
        newCheckboxes[index].value = !newCheckboxes[index].value
        setBrandFormData({ ...brandFormData, checkboxes: newCheckboxes })
    }

    const isFormValid = () => {
        if (variant === 'add') {
            return brandFormData.checkboxes.some(cb => cb.value) && brandFormData.link.trim() !== ''
        } else {
            return brandFormData.brandName.trim() !== '' && brandFormData.link.trim() !== ''
        }
    }

    const handleAddBrand = async () => {
        const formData = new FormData()

        // Add text fields
        formData.append('instaId', '_keshav_malik') // to be fixed
        formData.append('brandName', brandFormData.brandName)
        formData.append('contentType', brandFormData.checkboxes.filter(cb => cb.value).map(cb => cb.label).join(','))
        formData.append('contentUrl', brandFormData.link)
        formData.append('reach', brandFormData.reach)
        formData.append('engagement', brandFormData.engagement)

        console.log('formData', formData)

        if (brandFormData.brandLogoFile) {
            formData.append('brandLogo', brandFormData.brandLogoFile)
        }

        const res = await addBrandCollaboration(formData)

        if (res.success) {
            setIsAddBrandModelOpen(false)
            setAllBrandData({
                ...allBrandData,
                isActive: true,
                brands: [...allBrandData.brands, {
                    brandName: brandFormData.brandName,
                    brandLogo: brandFormData.brandLogoFile,
                    contentUrl: brandFormData.link,
                    reach: brandFormData.reach,
                    engagement: brandFormData.engagement,
                    contentType: brandFormData.checkboxes.filter(cb => cb.value).map(cb => cb.label).join(',')
                }]
            })
            window.location.reload()
            toast.success('Brand added successfully')
        } else {
            toast.error(res.message)
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setBrandLogoFile(file)
            const reader = new FileReader()
            reader.onload = (e) => {
                setBrandFormData({ ...brandFormData, brandLogo: e.target?.result as string, brandLogoFile: file })
            }
            reader.readAsDataURL(file)
        }
        console.log('brandFormData', brandFormData)
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleEditBrand = async () => {
        // Compare current form data with original data to find changes
        if (!instaId || !allBrandData) {
            console.log({
                instaId,
                allBrandData
            })
            toast.error('Something went wrong')
            console.log('Insta ID or allBrandData is not defined')
            return
        }

        const changes: any = {}

        if (brandFormData.brandName !== originalData.brandName) {
            changes.brandName = brandFormData.brandName
        }

        if (brandFormData.link !== originalData.contentUrl) {
            changes.contentUrl = brandFormData.link
        }

        if (brandFormData.reach !== originalData.reach) {
            changes.reach = parseFloat(brandFormData.reach) || 0
        }

        if (brandFormData.engagement !== originalData.engagement) {
            changes.engagement = parseFloat(brandFormData.engagement) || 0
        }

        const originalContentTypes = originalData.contentType?.split(',') || []
        const newContentTypes = brandFormData.checkboxes.filter(cb => cb.value).map(cb => cb.label)

        if (JSON.stringify(originalContentTypes.sort()) !== JSON.stringify(newContentTypes.sort())) {
            changes.contentType = newContentTypes.join(',')
        }

        if (brandFormData.brandLogoFile) {
            changes.brandLogo = brandFormData.brandLogoFile
        }

        if (Object.keys(changes).length === 0) {
            console.log('No changes detected')
            toast.info('No changes to update')
            return
        }

        const res = await updateMediaKitBrand({
            instaId: instaId,
            brandId: allBrandData._id,
            updates: {
                ...changes
            }
        })
        if (res.success) {
            toast.success('Brand updated successfully')
            setIsAddBrandModelOpen(false)
            window.location.reload()
        } else {
            toast.error(res.message)
        }
    }

    const handleDeleteBrand = async () => {
        const res = await deleteBrandCollaboration({
            instaId: instaId,
            brandId: allBrandData._id
        })

        if (res.success) {
            toast.success('Brand deleted successfully')
            setIsAddBrandModelOpen(false)
            window.location.reload()
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end justify-center animate-fadeIn p-[10px]"
            onClick={handleBackdropClick}
        >
            <div className='bg-[#FDFBFF] p-5 rounded-lg w-full flex flex-col gap-4 ease-in-out animate-slideUp transform transition-transform duration-300 '>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-1 text-2xl font-bold'>
                        <div> {variant === 'add' ? 'Add' : 'Edit'} </div>
                        <div className=' bg-gradient-to-r from-[#F37E57] to-[#EF3576] bg-clip-text text-transparent'>
                            Brand
                        </div>
                    </div>
                    {
                        variant === 'edit' ? (
                            <div className='flex items-center gap-2 text-xs border-[1px] border-red-500 rounded-[10px] px-[10px] py-[6px] cursor-pointer' onClick={handleDeleteBrand}>
                                <div className='text-[#3D4966] font-medium'> Delete </div>
                                <Trash2 size={14} className='cursor-pointer' onClick={handleDeleteBrand} />
                            </div>
                        ) : (
                            <X size={16} className='cursor-pointer' onClick={() => setIsAddBrandModelOpen(false)} />
                        )
                    }
                </div>
                <div className='text-[#0092DB] text-[10px] font-medium bg-[#E5F6FF] px-[10px] py-[6px] rounded-[10px]'>
                    Your Past Brand colloboration details, helps you to statnd out and get more Brands.
                </div>
                <div className='flex p-2 gap-3 border border-[E2E4E9] rounded-xl'>
                    <div className='flex items-center gap-2'>
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />
                        <div
                            className='bg-[#979EAD] rounded-[10px] p-2 cursor-pointer hover:bg-[#8A919F] transition-colors'
                            onClick={handleImageClick}
                        >
                            {brandFormData.brandLogo || brandFormData.brandLogoFile ? (
                                <Image
                                    src={brandFormData.brandLogoFile ? URL.createObjectURL(brandFormData.brandLogoFile) : brandFormData.brandLogo}
                                    alt='brand-logo'
                                    width={24}
                                    height={24}
                                    className="rounded-[6px] object-cover"
                                />
                            ) : (
                                <Image src={AddImageIcon} alt='insta-icon' width={24} height={24} />
                            )}
                        </div>
                    </div>
                    <div className='flex items-center' onClick={() => setBrandNameEditing(true)}>
                        {
                            brandNameEditing ? (
                                <input
                                    type='text'
                                    value={brandFormData.brandName}
                                    onChange={(e) => setBrandFormData({ ...brandFormData, brandName: e.target.value })}
                                    placeholder='Add Brand Name'
                                    className='text-[#3D4966] font-medium outline-none'
                                    onBlur={() => setBrandNameEditing(false)}
                                    autoFocus
                                />
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <div className='text-[#3D4966] font-medium'> {brandFormData.brandName || 'Brand Name'} </div>
                                    <Image src={EditPenIcon} alt='edit-pen' width={24} height={24} className='cursor-pointer' />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-bold'>Content type</div>
                    <div className='flex gap-2'>
                        {brandFormData.checkboxes.map((item, index) => (
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
                        value={brandFormData.link}
                        onChange={(e) => setBrandFormData({ ...brandFormData, link: e.target.value })}
                        className='placeholder:text-xs placeholder:text-[#8994A9] text-xs w-full border border-[#EAE9EC] rounded-[10px] p-[14px] outline-none'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-bold'>  Insight <span className='text-[#979EAD]'>(OPTIONAL)</span> </div>
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            placeholder='Reach'
                            value={brandFormData.reach}
                            onChange={(e) => setBrandFormData({ ...brandFormData, reach: e.target.value })}
                            className='placeholder:text-xs placeholder:text-[#8994A9] text-xs w-full border border-[#EAE9EC] rounded-[10px] p-[14px] outline-none'
                        />
                        <input
                            type='text'
                            placeholder='Engagement'
                            value={brandFormData.engagement}
                            onChange={(e) => setBrandFormData({ ...brandFormData, engagement: e.target.value })}
                            className='placeholder:text-xs placeholder:text-[#8994A9] text-xs w-full border border-[#EAE9EC] rounded-[10px] p-[14px] outline-none'
                        />
                    </div>
                </div>

                <div className='flex justify-end'>
                    <NewButton
                        variant={isFormValid() ? "primary" : "disabled"}
                        size="large"
                        onClick={variant === 'add' ? handleAddBrand : handleEditBrand}
                        className="w-full"
                    >
                        {variant === 'add' ? 'Add now' : 'Update now'}
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
        <div className='flex items-center gap-1 justify-between px-[10px] py-2 border border-[#EAE9EB] rounded-[10px] w-full' onClick={() => onChange(!value)}>
            <div className='text-[#414D55] font-medium text-sm'> {label} </div>
            <input
                type='checkbox'
                checked={value}

                className="w-4 h-4 accent-[#8B39FF]"
            />
        </div>
    )
}

export default BrandModal