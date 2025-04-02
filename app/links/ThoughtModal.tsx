import React, { useEffect, useState } from 'react';
import Modal from '@components/molecules/Modal'; // Assuming you have a Modal component
import { updateUserDetails } from 'api';
import { loadState } from '@utils/localStorage';
import { STORAGE_CONSTANTS } from '@utils/constants';
import { toast } from 'react-toastify';

export default function ThoughtsModal({ isOpen, onClose, thoughts, editMode }: any) {
    const [thought, setThought] = useState(thoughts || '');
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || '';

    useEffect(() => {
        if (isOpen) {
            setThought(thoughts || ''); // Set thought state when modal opens
        }
    }, [isOpen, thoughts]);

    const handleChange = async (e: any) => {
        setThought(e.target.value);
    };

    const onSave = async () => {
        try {
            const res = await updateUserDetails(userId, { thoughts: thought })

            toast.success('Your thoughts are saved! Publish to make it live.')

            onClose()
        } catch (error) {
            console.error('Error updating thoughts:', error);
        }
    }

    return (
        <Modal visible={isOpen} onCloseIconClick={onClose}>
            <div className="flex items-start">
                <span className="text-6xl text-gray-300 font-serif">“</span>
                <textarea
                    className="w-full h-32 p-4 bg-white text-lg border-0 focus:ring-0 focus:outline-none resize-none text-gray-800"
                    placeholder="Write your thoughts here..."
                    value={thought}
                    disabled={!editMode}
                    onChange={handleChange}
                />
            </div>

            {editMode &&
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Save
                    </button>
                </div>
            }
        </Modal>
    );
}
