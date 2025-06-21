import ItemsGrid from '../components/ItemsGrid';

const ViewItemsPage = () => {
    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Discover Amazing Items
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Find and join items that match your interests
                    </p>
                </div>
                <ItemsGrid />
            </div>
        </div>
    );
};

export default ViewItemsPage; 