'use client'
import { Header } from '@components/molecules/Header'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import SenderDetails from '@components/molecules/InvoiceSenderForm/senderForm'
import { getInvoiceById, updateInvoiceBank, updateInvoiceClient, updateInvoiceItemsAndNotes, updateInvoiceRecipient } from 'api/services'
import { InvoiceProps } from 'types'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoice } from 'store/slice/editInvoiceSlice'
import { RootState } from 'store/store'
import SenderInputs from '@components/templates/editInvoice/SenderInputs'
import NewButton from '@components/atoms/Button/NewButton'
import cx from 'classnames'
import ItemsInputs from '@components/templates/editInvoice/ItemsInputs'
import ReceiverInputs from '@components/templates/editInvoice/ReceiverInputs'
import PaymentInputs from '@components/templates/editInvoice/PaymentInputs'
import { toast } from 'react-toastify'
import DueDateInputs from '@components/templates/editInvoice/DueDateInputs'
import { loadState } from '@utils/localStorage'
import { STORAGE_CONSTANTS } from '@utils/constants'

const EditInvoice = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const { invoiceId } = useParams()

  const invoiceDetails = useSelector((state: RootState) => state.editInvoice)
  const [currentStage, setCurrentStage] = useState(searchParams.get('section') || 'senderDetails');
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";


  // Get Invoice Details and set in store
  useEffect(() => {
    const getInvoiceDetails = async () => {
      const response = await getInvoiceById(invoiceId)
      if (response.success) {
        console.log('Success', response)
        dispatch(setInvoice({
          id: invoiceId,
          clientDetails: {
            _id: response.invoice.clientDetails._id,
            name: response.invoice.clientDetails.name,
            email: response.invoice.clientDetails.email,
            address: response.invoice.clientDetails.address,
            city: response.invoice.clientDetails.city,
            state: response.invoice.clientDetails.state,
            zipcode: response.invoice.clientDetails.zipcode,
            gst: response.invoice.clientDetails.gst,
            pan: response.invoice.clientDetails.pan,
          },
          recipientDetails: {
            _id: response.invoice.recipientDetails._id,
            name: response.invoice.recipientDetails.name,
            email: response.invoice.recipientDetails.email,
            address: response.invoice.recipientDetails.address,
            city: response.invoice.recipientDetails.city,
            state: response.invoice.recipientDetails.state,
            zipcode: response.invoice.recipientDetails.zipcode,
            gst: response.invoice.recipientDetails.gst,
            pan: response.invoice.recipientDetails.pan,
          },
          bankDetails: {
            _id: response.invoice.bankDetails._id,
            bankName: response.invoice.bankDetails.bankName,
            accountNumber: response.invoice.bankDetails.accountNumber,
            ifscCode: response.invoice.bankDetails.ifscCode,
            accountName: response.invoice.bankDetails.accountName,
          },
          items: response.invoice.items,
          gst: response.invoice.gst,
          tds: response.invoice.tds,
          discount: response.invoice.discount,
          dueDate: response.invoice.dueDate,
          invoiceNumber: response.invoice.invoiceNumber,
          note: response.invoice.note,
          invoiceDate: response.invoice.invoiceDate,
        }))
      }
    }
    getInvoiceDetails()
  }, [invoiceId])




  const handleBackNavigation = () => {
    router.push(`/invoice/review/${invoiceId}`)
  }

  const getHeaderText = () => {
    switch (currentStage) {
      case 'senderDetails':
        return 'Edit Sender Details'
      case 'invoiceDetails':
        return 'Edit Invoice Details'
      case 'receiverDetails':
        return 'Edit Receiver Details'
      case 'paymentDetails':
        return 'Edit Payment Details'
      case 'dueDate':
        return 'Edit Due Date'
      default:
        return 'Edit Invoice'
    }
  }

  const renderStage = () => {
    switch (currentStage) {
      case 'senderDetails':
        return <SenderInputs senderDetails={invoiceDetails?.clientDetails} />
      case 'recipientDetails':
        return <ReceiverInputs recipientDetails={invoiceDetails?.recipientDetails} />
      case 'invoiceDetails':
        return <ItemsInputs invoiceDetails={invoiceDetails} />
      case 'paymentDetails':
        return <PaymentInputs bankDetails={invoiceDetails?.bankDetails} />
      case 'dueDate':
        return <DueDateInputs dueDate={invoiceDetails?.dueDate} invoiceDate={invoiceDetails?.invoiceDate} invoiceNumber={invoiceDetails?.invoiceNumber} />
    }
  }

  const editInvoiceState = useSelector((state: RootState) => state.editInvoice)


  const handleUpdateInvoice = async () => {
    console.log('Updating Invoice')
    let hasErrors = false;
    const updates = [];

    switch (currentStage) {
      case 'senderDetails':
        console.log('Sender Details Updated')
        if (editInvoiceState.isClientDetailsUpdated) {
          updates.push(
            updateInvoiceClient({
              ...editInvoiceState.clientDetails,
              clientId: editInvoiceState.clientDetails._id,
              userId: userId,
            })
          );
        }
        break;
      case 'recipientDetails':
        console.log('Recipient Details Updated')
        if (editInvoiceState.isRecipientDetailsUpdated) {
          updates.push(
            updateInvoiceRecipient({
              ...editInvoiceState.recipientDetails,
              recipientId: editInvoiceState.recipientDetails._id,
              userId: userId,
            })
          );
        }
        break
      case 'invoiceDetails':
        console.log('Invoice Details Updated')
        if (editInvoiceState.isItemsUpdated || editInvoiceState.isUpdated) {
          updates.push(
            updateInvoiceItemsAndNotes({
              invoiceId: editInvoiceState.id,
              id: editInvoiceState.id,
              items: editInvoiceState.items,
              note: editInvoiceState.note,
              gst: editInvoiceState.gst,
              tds: editInvoiceState.tds,
              discount: editInvoiceState.discount,
              dueDate: editInvoiceState.dueDate,
              userId: userId,
            })
          );
        }


        break;
      case 'paymentDetails':
        console.log('Bank Details Updated')
        if (editInvoiceState.isBankDetailsUpdated) {
          updates.push(
            updateInvoiceBank({
              ...editInvoiceState.bankDetails,
              id: editInvoiceState.bankDetails._id,
              userId: userId
            })
          );
        }
        break;
    }

    try {
      const results = await Promise.all(updates);
      hasErrors = results.some(result => !result.success);

      if (hasErrors) {
        toast.error('Some updates failed. Please try again.');
      } else {
        toast.success('Invoice updated successfully!');
        router.push(`/invoice/review/${editInvoiceState.id}`);
      }
    } catch (error) {
      toast.error('Failed to update invoice. Please try again.');
    }
  }

  const handleNextStage = () => {
    switch (currentStage) {
      case 'senderDetails':
        setCurrentStage('recipientDetails')
        router.push(`/invoice/edit/${invoiceId}?section=receiverDetails`)
        break
      case 'recipientDetails':
        setCurrentStage('invoiceDetails')
        router.push(`/invoice/edit/${invoiceId}?section=invoiceDetails`)
        break
      case 'invoiceDetails':
        setCurrentStage('paymentDetails')
        router.push(`/invoice/edit/${invoiceId}?section=paymentDetails`)
        break
      case 'paymentDetails':
        setCurrentStage('dueDate')
        router.push(`/invoice/edit/${invoiceId}?section=dueDate`)
        break
      case 'dueDate':
        handleUpdateInvoice()
        break
    }
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      <Header onBackClick={handleBackNavigation} title={getHeaderText()} />

      <div className="overflow-scroll h-full w-full pt-20">
        {renderStage()}
      </div>

      <div className={cx(
        "bottom-0 py-4 fixed justify-center w-[90%]",
      )}>
        <NewButton
          size="large"
          variant="primary"
          className="w-full"
          onClick={handleUpdateInvoice}
        >
          Update Invoice
        </NewButton>
      </div>
    </div>
  )
}

export default EditInvoice