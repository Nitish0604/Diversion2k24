import React from 'react';

const VaccineModal = ({ isOpen, onClose, onSubmit, vaccineName, setVaccineName }) => {
    if (!isOpen) return null;

    

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
        setVaccineName(''); // Reset input field after submission
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                <h2 className="text-xl font-semibold mb-4">Add Vaccine Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Vaccine Name:</label>
                        <input
                            type="text"
                            value={vaccineName}
                            onChange={(e) => setVaccineName(e.target.value)}
                            className="border rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Add Vaccine
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VaccineModal;
