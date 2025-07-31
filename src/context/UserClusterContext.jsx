import React, { createContext, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserClusterContext = createContext();

export const UserClusterProvider = ({ children }) => {
    const API_BASE_URL = import.meta.env.VITE_APPLICATION_BACKEND_BASE_URL;
    const getToken = () => Cookies.get("jwt");
    const getOrg = () => Cookies.get("orgId");
    const orgId = getOrg();
    const jwt = getToken();

    // Get Clusters Assigned with User
    const getAssignClusters = async (userId) => {
        if (!orgId || !jwt) { throw new Error("Missing organization or token."); }

        try {
            const response = await axios.get(
                `${API_BASE_URL}/orgs/${orgId}/users/${userId}/assigned`,
                {
                    headers: {
                        Authorization: jwt,
                    },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || "Error fetching Assigned Clusters.";
        }
    };

    // Get Clusters Not Assigned with User
    const getUnAssignClusters = async (userId) => {
        if (!orgId || !jwt) { throw new Error("Missing organization or token."); }

        try {
            const response = await axios.get(
                `${API_BASE_URL}/orgs/${orgId}/users/${userId}/unassigned`,
                {
                    headers: {
                        Authorization: jwt,
                    },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || "Error fetching Unassigned Clusters.";
        }
    };

    // Assign Cluster to User
    const assignCluster = async (userId, clusterId) => {
        if (!orgId || !jwt) { throw new Error("Missing organization or token."); }

        try {
            await axios.post(`${API_BASE_URL}/orgs/${orgId}/users/${userId}/clusters/${clusterId}`, {
                headers: {
                    Authorization: jwt,
                },
                withCredentials: true,
            });

        } catch (error) {
            throw error.response?.data || "Having trouble assigning cluster.";
        }
    };

    // Unassign Cluster from User
    const unAssignCluster = async (userId, clusterId) => {
        try {
            await axios.delete(`${API_BASE_URL}/orgs/${orgId}/users/${userId}/clusters/${clusterId}`, {
                headers: {
                    Authorization: jwt,
                },
                withCredentials: true,
            });

        } catch (error) {
            console.error("Failed to Unassign cluster:", error);
        }
    };

    return (
        <UserClusterContext.Provider
            value={{
                getAssignClusters,
                getUnAssignClusters,
                assignCluster,
                unAssignCluster,
                getToken,
                getOrg,
            }}>
            {children}
        </UserClusterContext.Provider>
    );
};

export const useUserClusterContext = () => useContext(UserClusterContext);