import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../../App.css';
import { useGroupContext } from "../../../context/GroupContext";
// import groupUsers from "../../../assets/groupUsers.json";
// import allUsers from "../../../assets/allUsers.json";

const GroupDetails = () => {
    const { id } = useParams();
    const { getGroupUsers, getAllUsers, addUserToGroup, removeUserFromGroup } = useGroupContext();

    const [existingUsers, setExistingUsers] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const groupUsersData = await getGroupUsers(id);
            const allUsersData = await getAllUsers();
            const existingIds = groupUsersData.map(u => u.id);
            const nonExistingUsers = allUsersData.filter(u => !existingIds.includes(u.id));

            setExistingUsers(existingIds);
            setAvailableUsers(nonExistingUsers);
        };
        fetchUsers();
    }, [id, getGroupUsers, getAllUsers]);

    const handleAdd = async (userId) => {
        const success = await addUserToGroup(id, userId);
        if (success) {
            const addedUser = availableUsers.find(u => u.id === userId);
            setExistingUsers(prev => [...prev, addedUser]);
            setAvailableUsers(prev => prev.filter(u => u.id !== userId));
        }
    };

    const handleRemove = async (userId) => {
        const success = await removeUserFromGroup(id, userId);
        if (success) {
            const removedUser = existingUsers.find(u => u.id === userId);
            setAvailableUsers(prev => [...prev, removedUser]);
            setExistingUsers(prev => prev.filter(u => u.id !== userId));
        }
    };

    return (
        <div className="p-6 text-black grid grid-cols-2 gap-20 h-screen overflow-y-auto">
            {/* Existing Users */}
            <div>
                <h2 className="text-2xl font-bold mb-3">Existing Users in Group</h2>
                <ul className="border rounded p-3 space-y-2 max-h-[500px] overflow-hidden overflow-y-auto shadow-2xl scrollbar-custom">
                    {existingUsers.map(user => (
                        <li
                            key={user.userId}
                            className="px-4 py-2 flex justify-between items-center bg-gray-200 hover:bg-gray-300 rounded transition"
                        >
                            <div className="flex justify-between items-center gap-10">
                                <div className="text-lg text-black">ID: {user.userId}</div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">{user.name}</div>
                                    <div className="text-sm text-gray-600">{user.email}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(user.id)}
                                className="bg-red-600 text-white px-2 py-1 rounded text-xs cursor-pointer hover:bg-red-500"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                    {existingUsers.length === 0 && (
                        <p className="text-gray-500">No users in this group.</p>
                    )}
                </ul>
            </div>

            {/* Available Users */}
            <div>
                <h2 className="text-2xl font-bold mb-3">Available Users</h2>
                <ul className="border rounded p-3 space-y-2 max-h-[500px] overflow-hidden overflow-y-auto shadow-2xl scrollbar-custom">
                    {availableUsers.map(user => (
                        <li
                            key={user.id}
                            className="px-4 py-2 flex justify-between items-center bg-gray-200 hover:bg-gray-300 rounded transition"
                        >
                            <div className="flex justify-between items-center gap-10">
                                <div className="text-lg text-black">ID: {user.userId}</div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">{user.name}</div>
                                    <div className="text-sm text-gray-600">{user.email}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAdd(user.id)}
                                className="bg-green-600 text-white px-2 py-1 rounded text-xs cursor-pointer hover:bg-green-500"
                            >
                                Add
                            </button>
                        </li>
                    ))}
                    {availableUsers.length === 0 && (
                        <p className="text-gray-500">No users found to add in this group.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default GroupDetails;
