import React from 'react';
import AddItemForm from '../components/AddItemForm';

const AddItemPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Create a New Item
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                    Fill in the details below to add a new item to the collection.
                </p>
            </div>
            <div className="mt-10">
                <AddItemForm />
            </div>
        </div>
    );
};

export default AddItemPage; 