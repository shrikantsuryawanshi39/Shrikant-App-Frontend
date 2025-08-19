import React, { useEffect, useState, useMemo, useCallback } from "react";
import '../../App.css';
import { useUserContext } from "../../context/UserContext";
import { useGroupContext } from "../../context/GroupContext";
import { useClusterAssignmentContext } from "../../context/ClusterAssignmentContext";

const ClusterAssignment = () => {
    const { getUsers } = useUserContext();
    const { getGroups } = useGroupContext();
    const { toggleClusterAssignment, getClusters } = useClusterAssignmentContext();

    const [mode, setMode] = useState("users"); // users | groups
    const [allEntities, setAllEntities] = useState([]);
    const [assignedClusters, setAssignedClusters] = useState([]);
    const [unAssignedClusters, setUnAssignedClusters] = useState([]);
    const [selectedEntityId, setSelectedEntityId] = useState(null);

    const [filters, setFilters] = useState({
        entities: { search: "", asc: true },
        assigned: { search: "", asc: true },
        unassigned: { search: "", asc: true }
    });

    // Fetch users or groups based on mode
    useEffect(() => {
        const fetchEntities = async () => {
            try {
                // entities can be users or groups based on mode
                const entities = mode === "users" ? await getUsers() : await getGroups();
                setAllEntities(entities || []);
                setSelectedEntityId(null);
                setAssignedClusters([]);
                setUnAssignedClusters([]);
            } catch (err) {
                console.error(`Error fetching ${mode}:`, err);
            }
        };
        fetchEntities();
    }, [mode, getUsers, getGroups]);

    // Fetch clusters
    const fetchClusters = useCallback(async (entityId) => {
        if (!entityId) {
            setAssignedClusters([]);
            setUnAssignedClusters([]);
            return;
        }
        try {
            const clusters = await getClusters(mode, entityId);
            setAssignedClusters(clusters?.filter(c => c.action === "assign").map(c => c.cluster) || []);
            setUnAssignedClusters(clusters?.filter(c => c.action === "unassign").map(c => c.cluster) || []);
        } catch (err) {
            console.error("Error fetching clusters:", err);
            setAssignedClusters([]);
            setUnAssignedClusters([]);
        }
    }, [getClusters, mode]);

    // Toggle cluster assignment
    const toggleAssignment = async (clusterId, action) => {
        if (!selectedEntityId) return alert(`Please select a ${mode.slice(0, -1)} first.`);
        try {
            const request = { clusterId, action };
            await toggleClusterAssignment(mode, selectedEntityId, request);
            await fetchClusters(selectedEntityId);
        } catch (error) {
            console.error("Failed to toggle cluster assignment:", error);
        }
    };

    // Search + sort
    const applySearchAndSort = useCallback((items, { search, asc }) => {
        return (items || [])
            .filter(item => item?.name?.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    }, []);

    const filteredEntities = useMemo(() =>
        applySearchAndSort(allEntities, filters.entities),
        [allEntities, filters.entities, applySearchAndSort]);

    const filteredAssigned = useMemo(() =>
        applySearchAndSort(assignedClusters, filters.assigned),
        [assignedClusters, filters.assigned, applySearchAndSort]);

    const filteredUnassigned = useMemo(() =>
        applySearchAndSort(unAssignedClusters, filters.unassigned),
        [unAssignedClusters, filters.unassigned, applySearchAndSort]);

    return (
        <div className="h-screen bg-gray-100 text-black p-5 overflow-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Associate Cluster</h1>

            {/* Mode Switch */}
            <div className="flex justify-center mb-6 gap-4">
                <button
                    className={`px-4 py-2 rounded ${mode === "users" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                    onClick={() => setMode("users")}
                >
                    User Mode
                </button>
                <button
                    className={`px-4 py-2 rounded ${mode === "groups" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
                    onClick={() => setMode("groups")}
                >
                    Group Mode
                </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-around items-start gap-6">
                {/* Entities (Users / Groups) */}
                <div className="border rounded bg-white shadow w-xl max-h-[500px] overflow-hidden">
                    <div className="p-3 bg-gray-300 flex items-center justify-between rounded-t">
                        <h2 className="font-semibold text-xl">{mode === "users" ? "Users" : "Groups"}</h2>
                        <div className="flex gap-3 items-center">
                            <button
                                className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs cursor-pointer transition"
                                onClick={() => setFilters(prev => ({
                                    ...prev,
                                    entities: { ...prev.entities, asc: !prev.entities.asc }
                                }))}>
                                Sort {filters.entities.asc ? "A→Z" : "Z→A"}
                            </button>
                            <input
                                type="text"
                                className="py-1 px-4 text-sm border border-gray-500 rounded outline-none"
                                placeholder={`Search ${mode}...`}
                                value={filters.entities.search}
                                onChange={(e) => setFilters(prev => ({
                                    ...prev,
                                    entities: { ...prev.entities, search: e.target.value }
                                }))} />
                        </div>
                    </div>
                    <ul className="px-4 py-2 overflow-y-auto max-h-[450px] scrollbar-hidden">
                        {filteredEntities.map((entity) => (
                            <li key={entity.id}
                                onClick={() => {
                                    setSelectedEntityId(entity.id);
                                    fetchClusters(entity.id);
                                }}
                                className="cursor-pointer my-2 bg-gray-100 p-2 rounded hover:bg-gray-200 transition-all duration-200">
                                <label>
                                    <input
                                        type="radio"
                                        name="selectedEntity"
                                        checked={selectedEntityId === entity.id}
                                        readOnly
                                    />{" "}
                                    {entity.name} {mode === "users" && `(${entity.email})`}
                                </label>
                            </li>
                        ))}
                    </ul>
                    {filteredEntities.length === 0 && (
                        <p className="text-center text-purple-800 my-3">No {mode} found.</p>
                    )}
                </div>

                {/* Assigned & Unassigned clusters (unchanged) */}
                <div className="flex flex-col items-center justify-center gap-4">
                    {/* Assigned */}
                    <div className="border rounded bg-white shadow w-xl max-h-[250px] overflow-y-auto overflow-hidden">
                        <div className="p-3 bg-gray-300 flex items-center justify-between">
                            <h2 className="font-semibold text-xl">Assigned Clusters</h2>
                            <div className="flex gap-3 items-center">
                                <button
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs cursor-pointer transition"
                                    onClick={() => setFilters(prev => ({
                                        ...prev,
                                        assigned: { ...prev.assigned, asc: !prev.assigned.asc }
                                    }))}
                                >
                                    Sort {filters.assigned.asc ? "A→Z" : "Z→A"}
                                </button>
                                <input
                                    type="text"
                                    className="p-1 px-4 text-sm border border-gray-500 rounded outline-none"
                                    placeholder="Search..."
                                    value={filters.assigned.search}
                                    onChange={(e) => setFilters(prev => ({
                                        ...prev,
                                        assigned: { ...prev.assigned, search: e.target.value }
                                    }))}
                                />
                            </div>
                        </div>
                        <ul className="px-4 py-2 overflow-y-auto max-h-[200px] scrollbar-hidden">
                            {filteredAssigned.map((cluster) => (
                                <li key={cluster.id}
                                    onClick={() => toggleAssignment(cluster.id, "unassign")}
                                    className="cursor-pointer my-2 bg-gray-100 p-2 rounded hover:bg-gray-200 transition-all duration-200">
                                    <label>
                                        <input type="checkbox" checked readOnly />{" "}
                                        {cluster.name} ({cluster.id})
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {filteredAssigned.length === 0 && (
                            <p className="text-center text-purple-800 my-3">No assigned clusters found.</p>
                        )}
                    </div>

                    {/* Unassigned */}
                    <div className="border rounded bg-white shadow w-xl max-h-[250px] overflow-hidden">
                        <div className="p-3 bg-gray-300 flex items-center justify-between">
                            <h2 className="font-semibold text-xl">Unassigned Clusters</h2>
                            <div className="flex gap-3 items-center">
                                <button
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs cursor-pointer transition"
                                    onClick={() => setFilters(prev => ({
                                        ...prev,
                                        unassigned: { ...prev.unassigned, asc: !prev.unassigned.asc }
                                    }))}
                                >
                                    Sort {filters.unassigned.asc ? "A→Z" : "Z→A"}
                                </button>
                                <input
                                    type="text"
                                    className="p-1 px-4 text-sm border border-gray-500 rounded outline-none"
                                    placeholder="Search..."
                                    value={filters.unassigned.search}
                                    onChange={(e) => setFilters(prev => ({
                                        ...prev,
                                        unassigned: { ...prev.unassigned, search: e.target.value }
                                    }))}
                                />
                            </div>
                        </div>
                        <ul className="px-4 py-2 overflow-y-auto max-h-[200px] scrollbar-hidden">
                            {filteredUnassigned.map((cluster) => (
                                <li key={cluster.id}
                                    onClick={() => toggleAssignment(cluster.id, "assign")}
                                    className="cursor-pointer my-2 bg-gray-100 p-2 rounded hover:bg-gray-200 transition-all duration-200">
                                    <label>
                                        <input type="checkbox" readOnly />{" "}
                                        {cluster.name} ({cluster.id})
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {filteredUnassigned.length === 0 && (
                            <p className="text-center text-purple-800 my-3">No unassigned clusters found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClusterAssignment;