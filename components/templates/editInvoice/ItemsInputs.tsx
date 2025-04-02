'use client'
import { addNote } from 'store/slice/invoiceSlice';

import Input from '@components/atoms/Input';
import React, { ChangeEvent, useState } from 'react'
import { Plus, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addDiscount, addGst } from 'store/slice/invoiceSlice';
import { RootState } from 'store/store';
import { updateItems, updateNote, addNewItem, deleteItem, updateTds, updateDiscount, updateGst } from 'store/slice/editInvoiceSlice';
import { toast } from 'react-toastify';


const ItemsInputs = ({ invoiceDetails }: { invoiceDetails: any }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const subTotal = useSelector((state: RootState) => state.invoice.subTotal);

  const calculateSubTotal = (items: any[]) => {
    const activeItems = items?.filter((item: any) => !item.isDeleted);
    const subtotal = activeItems?.reduce((acc: number, item: any) => {
      return acc + (item.quantity * item.price);
    }, 0);

    const gstAmount = (subtotal * (invoiceDetails?.gst || 0)) / 100;
    const tdsAmount = (subtotal * (invoiceDetails?.tds || 0)) / 100;
    const discountAmount = (subtotal * (invoiceDetails?.discount || 0)) / 100;

    return subtotal + gstAmount - tdsAmount - discountAmount;
  };

  const calculateTotal = (items: any[]) => {
    const activeItems = items?.filter((item: any) => !item.isDeleted);
    return activeItems?.reduce((acc: number, item: any) => {
      return acc + item.quantity * item.price;
    }, 0);
  };
  

  const handleAddItem = () => {
    if (!name || !quantity || !price) {
      toast.error('Please fill all item details');
      return;
    }

    const newItem = { name, quantity: Number(quantity), price: Number(price), isDeleted: false };
    dispatch(addNewItem(newItem));

    // Reset input fields
    setName('');
    setQuantity('');
    setPrice('');
  }

  const handleRemoveItem = (index: number) => {
    const activeItems = invoiceDetails.items.filter((item: any) => !item.isDeleted);

    if (activeItems.length <= 1) {
      toast.error('At least one item is required');
      return;
    }

    dispatch(deleteItem(index));
  }

  return (
    <div className="pt-4 px-5 flex flex-col gap-6 pb-16">

      {/* Items Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="text-[#5E6C84] text-xs font-semibold">ITEMS</div>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            placeholder="Item name"
            className="my-0"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            value={name}
          />
          <Input
            placeholder="Quantity"
            type="number"
            className="my-0"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
            value={quantity}
          />
          <Input
            placeholder="Price in Rs."
            type="number"
            className="my-0"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      {/* Add Item Button */}
      <div className="flex justify-end">
        <div
          className="flex gap-2 items-center border-[1px] border-brandPrimary py-2 px-4 w-fit rounded-full"
          onClick={handleAddItem}
        >
          <div className="text-sm font-semibold cursor-pointer">
            Add Item
          </div>
          <Plus
            size={16}
            className="text-white bg-brandPrimary rounded-full p-0.5 cursor-pointer"
          />
        </div>
      </div>

      {/* Items List */}
      {invoiceDetails?.items?.length > 0 && (
        <div className="flex flex-col gap-3 bg-white p-4 rounded-[10px]">
          <div className="gap-1">
            {invoiceDetails.items
              .filter((item: any) => !item.isDeleted)
              .map((item: any, index: number) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between text-sm py-2">
                    <div className="flex flex-col gap-[6px]">
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="text-xs text-[#3D4966]">
                        {item.quantity} x ₹{item.price}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <X size={20} className="text-red-600" onClick={() => handleRemoveItem(index)} />
                      <div className="text-sm font-medium">₹{item.quantity * item.price}</div>
                    </div>
                  </div>
                  {index < invoiceDetails.items.filter((item: any) => !item.isDeleted).length - 1 && (
                    <div
                      style={{
                        margin: "12px 0px",
                        border: "1px solid #C1C7D0",
                        borderStyle: "dashed",
                        borderWidth: "0.5px",
                        borderImage:
                          "repeating-linear-gradient(to right, #C1C7D0 0, #C1C7D0 5px, transparent 5px, transparent 10px) 1",
                      }}
                    ></div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* GST / TDS Section */}
      <div className="flex flex-col gap-3">
        <div className="text-[#5E6C84] text-xs font-semibold">PRICE</div>
        <div className="flex flex-col gap-1">
          <div className="bg-theme-2 px-4 py-1 h-12 text-sm text-[#414D55] rounded-lg w-full flex gap-[10px] items-center">
            <div className="w-full text-black">Total</div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">₹{calculateTotal(invoiceDetails?.items).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="bg-theme-2 px-4 py-1 h-12 text-sm text-[#414D55] rounded-lg w-full flex gap-[10px] items-center">
            <div className="w-full text-black">GST <span className="text-[#F05252]">{`(+)`}</span></div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={invoiceDetails?.gst ?? 0}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    dispatch(updateGst(value));
                  }
                }}
                placeholder="Add GST here"
                max="100"
                step="0.1"
                className="w-full bg-transparent font-semibold focus:outline-none text-end placeholder:text-right placeholder:text-gray-400 placeholder:font-light"
              />
              <span className="font-semibold pl-2">%</span>
            </div>
          </div>

          <div className="bg-theme-2 px-4 py-1 h-12 text-sm text-[#414D55] rounded-lg w-full flex gap-[10px] items-center">
            <div className="w-full text-black">TDS <span className="text-[#07CC55]">{`(-)`}</span></div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={invoiceDetails?.tds}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    dispatch(updateTds(value));
                  }
                }}
                max="100"
                step="0.1"
                placeholder="Add TDS here"
                className="w-full bg-transparent font-semibold focus:outline-none text-end placeholder:text-right placeholder:text-gray-400 placeholder:font-light"
              />
              <span className="font-semibold pl-2">%</span>
            </div>
          </div>

          <div className="bg-theme-2 px-4 py-1 h-12 text-sm text-[#414D55] rounded-lg w-full flex gap-[10px] items-center">
            <div className="w-full text-black">Discount <span className="text-[#07CC55]">{`(-)`}</span></div>
            <div className="flex items-center gap-1">
              <input
                placeholder="Discount"
                value={invoiceDetails?.discount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    dispatch(updateDiscount(value));
                  }
                }}
                className="w-full bg-transparent font-semibold focus:outline-none text-end placeholder:text-right placeholder:text-gray-400 placeholder:font-light"
              />
              <span className="font-semibold pl-2">%</span>
            </div>
          </div>

          <div className="bg-theme-2 px-4 py-1 h-12 text-sm text-[#414D55] rounded-lg w-full flex gap-[10px] items-center border border-[#C1C7D0]">
            <div className="w-full text-black">Sub Total</div>
            <div className="flex text-[#414D55] text-sm font-semibold">
              ₹{calculateSubTotal(invoiceDetails?.items).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Note Section */}
      <div className="flex flex-col gap-3 pb-5">
        <div className="text-[#5E6C84] text-xs font-semibold">NOTE</div>
        <textarea
          placeholder="Add a note(optional)"
          className="p-[14px] rounded-lg"
          rows={5}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch(updateNote(e.target.value))}
          value={invoiceDetails?.note}
        />
      </div>
    </div>
  )
}

export default ItemsInputs