import React, { createContext, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ClusterAssignmentContext = createContext();

export const ClusterAssignmentProvider = ({ children }) => {
    const API_BASE_URL = import.meta.env.VITE_APPLICATION_BACKEND_BASE_URL;
    const orgId = Cookies.get("orgId"); 
    const token = Cookies.get("jwt");

    const getClusters = async (mode, entityId) => {
        if (!orgId || !token) throw new Error("Missing organization or token.");
        if (!["users", "groups"].includes(mode)) throw new Error("Invalid mode.");

        try {
            const response = await axios.get(
                `${API_BASE_URL}/orgs/${orgId}/cluster-assignments/${mode}/${entityId}`,
                {
                    headers: { Authorization: token },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || "Error fetching Assigned Clusters.";
        }
    };

    const toggleClusterAssignment = async (mode, entityId, request) => {
        if (!orgId || !token) throw new Error("Missing organization or token.");
        if (!["users", "groups"].includes(mode)) throw new Error("Invalid mode.");

        try {
            await axios.post(
                `${API_BASE_URL}/orgs/${orgId}/cluster-assignments/${mode}/${entityId}`,
                { id: request.clusterId, action: request.action },
                {
                    headers: { Authorization: token },
                    withCredentials: true,
                }
            );
        } catch (error) {
            throw error.response?.data || "Having trouble in cluster assignment.";
        }
    };

    return (
        <ClusterAssignmentContext.Provider
            value={{
                getClusters,
                toggleClusterAssignment,
            }}
        >
            {children}
        </ClusterAssignmentContext.Provider>
    );
};

export const useClusterAssignmentContext = () => useContext(ClusterAssignmentContext);