import React, { useEffect, useState } from "react";
import '../../App.css';
import { useUserContext } from "../../context/UserContext";
import { useClusterAssignmentContext } from "../../context/ClusterAssignmentContext";

const ClusterAssignment = () => {
    const { getUsers } = useUserContext();
    const { toggleClusterAssignment, getClusters } = useClusterAssignmentContext();

    const [allUsers, setAllUsers] = useState([]);
    const [assignedClusters, setAssignedClusters] = useState([]);
    const [unAssignedClusters, setUnAssignedClusters] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const [userSearch, setUserSearch] = useState("");
    const [userSortAsc, setUserSortAsc] = useState(true);

    const [assignedSearch, setAssignedSearch] = useState("");
    const [assignedSortAsc, setAssignedSortAsc] = useState(true);

    const [unassignedSearch, setUnassignedSearch] = useState("");
    const [unassignedSortAsc, setUnassignedSortAsc] = useState(true);

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsers();
                setAllUsers(users);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchUsers();
    }, [getUsers]);

    // Fetch assigned and unassigned clusters for a user
    const fetchClusters = async (userId) => {
        if (!userId) {
            setAssignedClusters([]);
            setUnAssignedClusters([]);
            return;
        }

        try {
            const clusters = await getClusters(userId);
            setAssignedClusters(clusters?.filter((field) => field?.action == "assign").map((field) => field.cluster));
            setUnAssignedClusters(clusters?.filter((field) => field?.action == "unassign").map((field) => field.cluster));
        } catch (error) {
            console.error("Failed to fetch clusters:", error);
            setAssignedClusters([]);
            setUnAssignedClusters([]);
        }
    };

    const toggleAssignment = async (clusterId, action) => {
        if (!selectedUserId || !action) return alert("Please select a user first.");
        try {
            const request = {
                clusterId: clusterId,
                action: action
            }
            await toggleClusterAssignment(selectedUserId, request);
            await fetchClusters(selectedUserId);
        } catch (error) {
            console.error("Failed to assign cluster:", error);
        }
    };

    // Search and sort functions
    const applySearchAndSort = (items, searchTerm, sortAsc) => {
        const filtered = items?.filter(item =>
            item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filtered?.sort((a, b) =>
            sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
    };

    const filteredUsers = applySearchAndSort(allUsers, userSearch, userSortAsc);
    const filteredAssigned = applySearchAndSort(assignedClusters, assignedSearch, assignedSortAsc);
    const filteredUnassigned = applySearchAndSort(unAssignedClusters, unassignedSearch, unassignedSortAsc);

    return (
        <div className="h-screen bg-gray-100 text-black p-5 overflow-auto">
            <h1 className="text-3xl font-bold mb-10 text-center">Associate Cluster to User</h1>

            <div className="flex flex-col sm:flex-row justify-around items-start gap-6">
                {/* Users */}
                <div className="border rounded bg-white shadow w-xl max-h-[500px]">
                    <div className="p-3 bg-gray-300 flex items-center justify-between rounded-t">
                        <h2 className="font-semibold text-xl">Users</h2>
                        <div className="flex gap-2 items-center">
                            <button
                                className="px-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                                onClick={() => setUserSortAsc(prev => !prev)}
                            >
                                Sort {userSortAsc ? "↓" : "↑"}
                            </button>

                            <input
                                type="text"
                                className="p-1 px-4 text-sm rounded-2xl border border-gray-600 focus:border-black outline-none"
                                placeholder="Search user..."
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <ul className="px-4 overflow-y-auto max-h-[450px] scrollbar-hidden">
                        {filteredUsers?.map((user) => (
                            <li key={user.id}
                                onClick={() => {
                                    setSelectedUserId(user.id);
                                    fetchClusters(user.id);
                                }}
                                className="cursor-pointer my-2 bg-gray-100 p-2 rounded hover:bg-gray-200 transition-all duration-200">
                                <label>
                                    <input
                                        type="radio"
                                        name="selectedUser"
                                        checked={selectedUserId === user.id}
                                        readOnly
                                    />{" "}
                                    {user.name} ({user.email})
                                </label>
                            </li>
                        ))}
                    </ul>
                    {filteredUsers.length === 0 && (
                        <p className="text-center text-purple-800 my-3">No users found.</p>
                    )}
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                    {/* Assigned Clusters */}
                    <div className="border rounded bg-white shadow w-xl max-h-[250px] overflow-y-auto">
                        <div className="p-3 bg-gray-300 flex items-center justify-between">
                            <h2 className="font-semibold text-xl">Assigned Clusters</h2>
                            <div className="flex gap-2 items-center">
                                <button
                                    className="px-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                                    onClick={() => setAssignedSortAsc(prev => !prev)}
                                >
                                    Sort {assignedSortAsc ? "↓" : "↑"}
                                </button>

                                <input
                                    type="text"
                                    className="p-1 px-4 text-sm rounded-2xl border border-gray-600 focus:border-black outline-none"
                                    placeholder="Search..."
                                    value={assignedSearch}
                                    onChange={(e) => setAssignedSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <ul className="px-4 overflow-y-auto max-h-[200px] scrollbar-hidden">
                            {filteredAssigned?.map((cluster) => (
                                <li key={cluster.id}
                                    onClick={() => toggleAssignment(cluster.id, "unassign")}
                                    className="cursor-pointer my-2 bg-gray-100 p-2 rounded hover:bg-gray-200 transition-all duration-200">
                                    <label>
                                        <input type="checkbox" checked={true} readOnly />{" "}
                                        {cluster.name} ({cluster.id})
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {filteredAssigned?.length === 0 && (
                            <p className="text-center text-purple-800 my-3">No assigned clusters found.</p>
                        )}
                    </div>

                    {/* Unassigned Clusters */}
                    <div className="border rounded bg-white shadow w-xl max-h-[250px] overflow-y-auto">
                        <div className="p-3 bg-gray-300 flex items-center justify-between">
                            <h2 className="font-semibold text-xl">Unassigned Clusters</h2>
                            <div className="flex gap-2 items-center">
                                <button
                                    className="px-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                                    onClick={() => setUnassignedSortAsc(prev => !prev)}
                                >
                                    Sort {unassignedSortAsc ? "↓" : "↑"}
                                </button>

                                <input
                                    type="text"
                                    className="p-1 px-4 text-sm rounded-2xl border border-gray-600 focus:border-black outline-none"
                                    placeholder="Search..."
                                    value={unassignedSearch}
                                    onChange={(e) => setUnassignedSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <ul className="px-4 overflow-y-auto max-h-[200px] scrollbar-hidden">
                            {filteredUnassigned?.map((cluster) => (
                                <li key={cluster.id}
                                    onClick={() => toggleAssignment(cluster.id, "assign")}
                                    className="cursor-pointer my-2 bg-gray-100 p-2 rounded hover:bg-gray-200 transition-all duration-200">
                                    <label>
                                        <input type="checkbox" checked={false} readOnly />{" "}
                                        {cluster.name} ({cluster.id})
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {filteredUnassigned?.length === 0 && (
                            <p className="text-center text-purple-800 my-3">No unassigned clusters found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClusterAssignment;  