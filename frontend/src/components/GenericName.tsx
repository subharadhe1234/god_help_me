import React, { useState } from "react";

const GenericName = () => {
    const [isOpenName, setIsOpenName] = useState(false);
    const [isOpenItems, setIsOpenItems] = useState(false);

    const name = "Generic Name";
    const handleName = () => {
        setIsOpenName(!isOpenName);
    }

    const genericItems = ["Paracetamol", "Ibuprofen", "Aspirin", "Amoxicillin", "Metformin"];

    return (
        <div className="relative inline-block mt-4">
            {/* Toggle Button */}
            <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                onClick={handleName}
            >
                Generate Generic Name
            </button>
            <div>
                {isOpenName && (
                    <button
                        onClick={() => setIsOpenItems(!isOpenItems)}
                    >
                        <h1 className="text-lg bg-green-600 px-3 py-2 text-white  rounded-lg font-bold text-center mt-2">{name}</h1>
                    </button>
                )}
                {isOpenItems && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <ul className="py-2">
                            {genericItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-blue-100 text-gray-700 cursor-pointer transition duration-200"
                                    onClick={() => setIsOpenItems(false)} // Close dropdown when item is clicked
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

        </div>
    );
};

export default GenericName;
