import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../../App.css';
import { useGroupContext } from "../../../context/GroupContext";
// import groupUsers from "../../../assets/groupUsers.json";
// import allUsers from "../../../assets/allUsers.json";

const GroupDetails = () => {
    const { id } = useParams();
    const { handleUsersInGroup, getGroupUsers } = useGroupContext();

    const [existingUsers, setExistingUsers] = useState([]);
    const [nonExisting, setNonExisting] = useState([]);

    const fetchUsers = async () => {
        const groupUsersData = await getGroupUsers(id);
        setExistingUsers(groupUsersData.filter((user) => user.status == "existing").map((field) => field.user));
        setNonExisting(groupUsersData.filter((user) => user.status == "nonexisting").map((field) => field.user));
    };

    useEffect(() => {
        fetchUsers();
    }, [id]);

    const handleUsers = async (userId, groupId, action) => {
        await handleUsersInGroup(userId, groupId, action);
        fetchUsers();
    };

    return (
        <div className="p-6 text-black grid grid-cols-2 gap-20 h-screen overflow-y-auto">
            {/* Existing Users */}
            <div>
                <h2 className="text-2xl font-bold mb-3">Existing Users in Group</h2>
                <ul className="border rounded p-3 space-y-2 max-h-[500px] overflow-hidden overflow-y-auto shadow-2xl scrollbar-custom">
                    {existingUsers.map(user => (
                        <li
                            key={user.id}
                            className="px-4 py-2 flex justify-between items-center bg-gray-200 hover:bg-gray-300 rounded transition"
                        >
                            <div className="flex justify-between items-center gap-10">
                                <div className="text-lg text-black">ID: {user.id}</div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">{user.name}</div>
                                    <div className="text-sm text-gray-600">{user.email}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleUsers(user.id, id, "remove")}
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
                    {nonExisting.map(user => (
                        <li
                            key={user.id}
                            className="px-4 py-2 flex justify-between items-center bg-gray-200 hover:bg-gray-300 rounded transition"
                        >
                            <div className="flex justify-between items-center gap-10">
                                <div className="text-lg text-black">ID: {user.id}</div>
                                <div className="flex flex-col">
                                    <div className="font-semibold">{user.name}</div>
                                    <div className="text-sm text-gray-600">{user.email}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleUsers(user.id, id, "add")}
                                className="bg-green-600 text-white px-2 py-1 rounded text-xs cursor-pointer hover:bg-green-500"
                            >
                                Add
                            </button>
                        </li>
                    ))}
                    {nonExisting.length === 0 && (
                        <p className="text-gray-500">No users found to add in this group.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default GroupDetails;
