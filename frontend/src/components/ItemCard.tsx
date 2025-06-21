import React from 'react';
import type { Item } from '../types';

interface ItemCardProps {
    item: Item;
    onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300" onClick={onClick}>
            <img className="w-full h-48 object-cover" src={item.coverImage} alt={item.name} />
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description.substring(0, 100)}...</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        {item.type}
                    </span>
                    <span className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default ItemCard; 