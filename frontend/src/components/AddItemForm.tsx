import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface FormInputs {
    name: string;
    type: string;
    description: string;
    coverImage: FileList;
    additionalImages: FileList;
}

const ITEM_TYPES = [
    'Shirt',
    'Pant',
    'Shoes',
    'Sports Gear',
    'Other',
];

const AddItemForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormInputs>();
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('type', data.type);
        formData.append('description', data.description);
        if (data.coverImage?.[0]) {
            formData.append('coverImage', data.coverImage[0]);
        }
        if (data.additionalImages) {
            Array.from(data.additionalImages).forEach(file => {
                formData.append('additionalImages', file);
            });
        }
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/items`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Item successfully added!');
            setError(null);
            reset();
        } catch (err) {
            console.error(err);
            setError('Failed to add item. Please try again.');
            setMessage(null);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                </div>
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Item Type</label>
                    <select
                        id="type"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        {...register('type', { required: 'Type is required' })}
                    >
                        <option value="">Select type</option>
                        {ITEM_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.type && <span className="text-red-500 text-sm mt-1">{errors.type.message}</span>}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        {...register('description', { required: 'Description is required' })}
                    />
                    {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>}
                </div>
                <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image</label>
                    <input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        {...register('coverImage', { required: 'Cover image is required' })}
                    />
                    {errors.coverImage && <span className="text-red-500 text-sm mt-1">{errors.coverImage.message}</span>}
                </div>
                <div>
                    <label htmlFor="additionalImages" className="block text-sm font-medium text-gray-700">Additional Images</label>
                    <input
                        id="additionalImages"
                        type="file"
                        accept="image/*"
                        multiple
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        {...register('additionalImages')}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Item'}
                    </button>
                </div>
                {message && <div className="text-center text-green-600 font-semibold mt-4">{message}</div>}
                {error && <div className="text-center text-red-600 font-semibold mt-4">{error}</div>}
            </form>
        </div>
    );
};

export default AddItemForm; 