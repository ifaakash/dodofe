"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import Input from "@components/atoms/Input/Input";
import { Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGst,
  addTds,
  addDiscount,
  addNote,
  addItem,
  removeItem
} from "store/slice/invoiceSlice";
import { RootState } from 'store/store';
import { InvoiceItem } from "types";
import cx from 'classnames';
import { isEmpty } from "@utils/index";
import NewButton from "@components/atoms/Button/NewButton";

const getWordCount = (text: string) => {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

const getCharCount = (text: string) => {
  return text ? text.length : 0;
};

const InvoiceDetails = ({ setCurrentStage }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const state = useSelector((state: any) => state.invoice);

  useEffect(() => {
    console.log(state.items)
    if (state.items.length > 0) {
      setDisableNextButton(false);
    } else {
      setDisableNextButton(true);
    }

    const calculateTotals = () => {
      // Calculate items total
      const itemsTotal = state.items.reduce((sum: any, item: any) => {
        return sum + item.price * item.quantity;
      }, 0);

      // Calculate tax amounts
      const gstAmount = itemsTotal * (state.gst / 100);
      const tdsAmount = itemsTotal * (state.tds / 100);
      const discountAmount = itemsTotal * (state.discount / 100);

      // Calculate final subtotal
      const finalSubTotal = itemsTotal + gstAmount - tdsAmount - discountAmount;
      setSubTotal(finalSubTotal);
    };

    calculateTotals();
  }, [state.items, state.gst, state.tds, state.discount]);

  useEffect(() => {
    setWordCount(getWordCount(state.note));
  }, [state.note]);

  useEffect(() => {
    setCharCount(getCharCount(state.note));
  }, [state.note]);

  const handleAddItem = () => {
    if (name && quantity && price) {
      const newItem: InvoiceItem = {
        name,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price),
        description: name,
        rate: parseFloat(price),
      };

      dispatch(addItem(newItem));

      // Clear the input fields
      setName("");
      setQuantity("");
      setPrice("");
    } else {
      alert("Please fill out all fields before adding an item.");
    }
  };

  const handleRemoveItem = (index: number) => {
    dispatch(removeItem(index));
  }

  return (
    <div className="py-4 px-5 flex flex-col gap-6">
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
      {state.items.length > 0 && (
        <div className="flex flex-col gap-3 bg-white p-4 rounded-[10px]">
          <div className="gap-1">
            {state.items.map((item: any, index: number) => (
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
                {index < state.items.length - 1 && (
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

      <div className="flex flex-col gap-3">
        <div className="text-[#5E6C84] text-xs font-semibold">PRICE</div>
        <div className="flex flex-col gap-1">

          <div className="bg-theme-2 px-4 py-1 h-12 text-sm text-[#414D55] rounded-lg w-full flex gap-[10px] items-center">
            <div className="w-full text-black">Total</div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">₹{state.items.reduce((sum, item) => sum + (item.rate * item.quantity), 0)}</span>
            </div>
          </div>

          <div className="bg-theme-2 px-4 py-1 h-12 text-sm text-[#414D55] rounded-lg w-full flex gap-[10px] items-center">
            <div className="w-full text-black">GST <span className="text-[#F05252]">{`(+)`}</span></div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={state.gst === null ? '' : state.gst}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value === '' ? null : parseFloat(e.target.value);
                  if (value === null || (!isNaN(value) && value >= 0)) {
                    dispatch(addGst(value));
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
                value={state.tds === null ? '' : state.tds}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value === '' ? null : parseFloat(e.target.value);
                  if (value === null || (!isNaN(value) && value >= 0)) {
                    dispatch(addTds(value));
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
                type="number"
                value={state.discount === null ? '' : state.discount}
                placeholder="If any"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value === '' ? null : parseFloat(e.target.value);
                  if (value === null || (!isNaN(value) && value >= 0)) {
                    dispatch(addDiscount(value));
                  }
                }}
                className="w-full bg-transparent font-semibold focus:outline-none text-end placeholder:text-right placeholder:text-gray-400 placeholder:font-light"
              />
              <span className="font-semibold pl-2">%</span>
            </div>
          </div>
          <div className="bg-theme-2 px-4 py-1 h-12 text-sm text-[#414D55] rounded-lg w-full flex gap-[10px] items-center border border-[#C1C7D0]">
            <div className="w-full text-black">Sub Total</div>
            <div className="flex text-black text-sm font-semibold">
              ₹{subTotal}
            </div>
          </div>
        </div>
      </div>

      {/* Note Section */}
      <div className="flex flex-col gap-3 pb-5">
        <div className="text-[#5E6C84] text-xs font-semibold">NOTE</div>
        <div className="relative">
          <textarea
            placeholder="Add a note(optional)"
            className="p-[14px] rounded-lg w-full"
            rows={2}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              const text = e.target.value;
              if (text.length <= 60) {
                dispatch(addNote(text));
              }
            }}
            value={state.note}
            style={{
              minHeight: '64px',
              resize: 'vertical',
              maxHeight: '200px',
              paddingBottom: '25px'
            }}
            maxLength={60}
          />
          <div className={`absolute bottom-2 right-3 text-xs ${charCount === 60 ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/60
          </div>
        </div>
      </div>

      <div className={cx(
        "bottom-0 py-4 fixed justify-center",
      )}
        style={{ width: '90%' }}
      >
        <NewButton
          size="large"
          variant={disableNextButton ? "disabled" : "primary"}
          className="w-full"
          onClick={() => setCurrentStage('paymentDetails')}
        >
          Next
        </NewButton>
      </div>
    </div>
  );
};

export default InvoiceDetails;
