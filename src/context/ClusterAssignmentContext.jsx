import React, { createContext, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ClusterAssignmentContext = createContext();

export const ClusterAssignmentProvider = ({ children }) => {
    const API_BASE_URL = import.meta.env.VITE_APPLICATION_BACKEND_BASE_URL;
    const getToken = () => Cookies.get("jwt");
    const getOrg = () => Cookies.get("orgId");
    const orgId = getOrg();
    const jwt = getToken();

    const getClusters = async (userId) => {
        if (!orgId || !jwt) { throw new Error("Missing organization or token."); }

        try {
            const response = await axios.get(
                `${API_BASE_URL}/orgs/${orgId}/cluster-assignments/users/${userId}`,
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

    const toggleClusterAssignment = async (userId, request) => {
        if (!orgId || !jwt) { throw new Error("Missing organization or token."); }

        try {
            await axios.post(`${API_BASE_URL}/orgs/${orgId}/cluster-assignments/users/${userId}`, {
                clusterId: request.clusterId,
                action: request.action
            }, {
                headers: {
                    Authorization: jwt,
                },
                withCredentials: true,
            });

        } catch (error) {
            throw error.response?.data || "Having trouble in cluster assignment.";
        }
    };

    return (
        <ClusterAssignmentContext.Provider
            value={{
                toggleClusterAssignment,
                getClusters
            }}>
            {children}
        </ClusterAssignmentContext.Provider>
    );
};

export const useClusterAssignmentContext = () => useContext(ClusterAssignmentContext);