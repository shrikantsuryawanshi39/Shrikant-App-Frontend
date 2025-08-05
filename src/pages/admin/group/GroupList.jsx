import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../../../App.css';
import { useGroupContext } from "../../../context/GroupContext";
// import groupsDummy from "../../../assets/groups.json";

const GroupList = () => {
    const { getGroups } = useGroupContext();
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
            const data = await getGroups();
            setGroups(data || []);
        };
        fetchGroups();
    }, [getGroups]);

    return (
        <div className="p-6 text-black h-screen scrollbar-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 bg-blue-800 text-white p-2 px-4 rounded">
                <h1 className="text-xl font-bold">Groups in Organization</h1>
                <NavLink to="/CreateGroup">
                    <button className="bg-green-600 hover:bg-green-700 shadow-xl text-white px-4 py-2 rounded cursor-pointer transition">
                        Create New Group
                    </button>
                </NavLink>
            </div>

            {/* Groups List */}
            <div className="flex justify-center w-full">
                <div className="border rounded shadow overflow-y-auto max-h-[70vh] max-w-[80vw] w-full bg-gray-50 scrollbar-custom">
                    <ul className="divide-y divide-gray-300">
                        {groups.map((group) => (
                            <li
                                key={group.id}
                                className="px-4 py-2 m-3 flex justify-between items-center bg-gray-200 hover:bg-gray-300 cursor-pointer transition rounded"
                                onClick={() => navigate(`/GroupDetails/${group.id}`)}
                            >
                                {/* Left Side: Group ID + Name + Description */}
                                <div className="flex justify-center items-center gap-10">
                                    <div className="text-black text-lg font-medium px-4">
                                        ID: {group.id}
                                    </div>
                                    <div className="flex flex-col ml-4">
                                        <div className="font-semibold text-lg">{group.name}</div>
                                        <div className="text-gray-600 text-sm">
                                            {group.description || "No description"}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side Created At */}
                                <div className="text-right text-sm text-gray-500">
                                    {group.createdAt
                                        ? new Date(group.createdAt).toLocaleString()
                                        : "N/A"}
                                </div>
                            </li>
                        ))}
                        {groups.length === 0 && (
                            <li className="p-4 text-center text-gray-500">No groups found for this organization</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GroupList;
