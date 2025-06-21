import React, { useState, useEffect, useRef } from 'react';
import { FocusTrap } from 'focus-trap-react';
import type { Item } from '../types';

interface ItemModalProps {
    item: Item | null;
    onClose: () => void;
    onEnquire: (item: Item) => void;
    enquiryStatus: { message: string; error: boolean } | null;
}

const ItemModal: React.FC<ItemModalProps> = ({
    item,
    onClose,
    onEnquire,
    enquiryStatus,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!item) return null;

    const allImages = [item.coverImage, ...item.additionalImages];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto px-4 py-8"
            onClick={onClose}
        >
            <FocusTrap>
                <div
                    className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-2xl transition-transform transform duration-300 animate-slide-in"
                    onClick={(e) => e.stopPropagation()}
                    ref={modalRef}
                >
                    {/* Image Section */}
                    <div className="relative">
                        <img
                            src={allImages[currentImageIndex]}
                            alt={item.name}
                            className="w-full h-96 object-cover rounded-tl-xl rounded-tr-xl"
                        />
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
                                >
                                    &#10094;
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
                                >
                                    &#10095;
                                </button>
                            </>
                        )}
                        <button
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Info Section */}
                    <div className="p-6 md:p-8">
                        {enquiryStatus ? (
                            <div className={`p-4 rounded-md text-center ${enquiryStatus.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {enquiryStatus.message}
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col md:flex-row md:items-start justify-between">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                                        {item.name}
                                    </h2>
                                    <button
                                        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 w-full md:w-auto"
                                        onClick={() => onEnquire(item)}
                                    >
                                        Enquire
                                    </button>
                                </div>
                                <div className="border-t border-gray-200 my-4" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2">Date</h4>
                                        <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2">Type</h4>
                                        <p>{item.type}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h4 className="font-bold text-gray-800 mb-2">Description</h4>
                                    <p className="text-gray-600 whitespace-pre-wrap">{item.description}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </FocusTrap>
        </div>
    );
};

export default ItemModal;
