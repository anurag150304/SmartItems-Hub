import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';
import ItemModal from './ItemModal';
import type { Item } from '../types';

const ITEM_TYPES = [
    'All',
    'Shirt',
    'Pant',
    'Shoes',
    'Sports Gear',
    'Other',
];

const ITEMS_PER_PAGE = 9;

const ItemsGrid: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('All');
    const [page, setPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [enquiryStatus, setEnquiryStatus] = useState<{ message: string; error: boolean } | null>(null);

    const handleEnquire = async (item: Item) => {
        setEnquiryStatus({ message: 'Sending inquiry...', error: false });
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/items/enquire/${item._id}`);
            setEnquiryStatus({ message: res.data.message, error: false });
        } catch {
            setEnquiryStatus({ message: 'Failed to send inquiry.', error: true });
        }
        setTimeout(() => {
            setEnquiryStatus(null);
            setSelectedItem(null);
        }, 3000);
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/items`) // Make sure the backend URL is correct
            .then(res => {
                setItems(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load items');
                setLoading(false);
            });
    }, []);

    const filtered = items.filter(item => {
        const matchesType = type === 'All' || item.type === type;
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesSearch;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={type}
                    onChange={e => setType(e.target.value)}
                >
                    {ITEM_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>
            {loading && <div className="text-center text-gray-500">Loading...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginated.map(item => (
                    <ItemCard
                        key={item._id}
                        item={item}
                        onClick={() => setSelectedItem(item)}
                    />
                ))}
            </div>
            {!loading && filtered.length === 0 && (
                <div className="text-center text-gray-500 mt-8">No items found.</div>
            )}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">Page {page} of {totalPages}</span>
                    <button
                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
            {selectedItem && (
                <ItemModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onEnquire={handleEnquire}
                    enquiryStatus={enquiryStatus}
                />
            )}
        </div>
    );
};

export default ItemsGrid; 