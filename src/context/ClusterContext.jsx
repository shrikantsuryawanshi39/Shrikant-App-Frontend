import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ClusterContext = createContext();

export const ClusterProvider = ({ children }) => {
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const API_BASE_URL = import.meta.env.VITE_APPLICATION_BACKEND_BASE_URL;
    const getToken = () => Cookies.get("jwt");
    const getOrg = () => Cookies.get("orgId");
    const orgId = getOrg();
    const jwt = getToken();

    // Get Cluster at ClusterList
    const getClusters = async () => {
        if (!orgId || !jwt) {
            throw new Error("Missing organization or token.");
        }

        try {
            const response = await axios.get(
                `${API_BASE_URL}/org/${orgId}/cluster`,
                {
                    headers: {
                        Authorization: jwt,
                    },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || "Error fetching clusters.";
        }
    };

    const addCluster = async (data, reset) => {
        if (!jwt) {
            return;
        }
        if (!orgId) {
            return;
        }

        try {
            const payload = {
                name: data.clustername,
                description: data.description,
                status: true,
                createdAt: new Date().toISOString(),
            };

            await axios.post(`${API_BASE_URL}/org/${orgId}/cluster`, payload, {
                withCredentials: true,
                headers: {
                    Authorization: jwt,
                },
            });
            setFormError("")

            setSuccessMessage("Cluster added successfully ✅");
            setTimeout(() => {
                setSuccessMessage("");
            }, 4000);

            if (reset) { reset(); }
        } catch (error) {
            const msg = error.response?.data || "Having trouble adding this Cluster/Cluster already exist";
            setFormError(msg);
        }
    };

    const deleteCluster = async (clusterId) => {
        try {
            await axios.delete(`${API_BASE_URL}/org/${orgId}/cluster/${clusterId}`, {
                withCredentials: true,
                headers: {
                    Authorization: jwt,
                },
            });
            alert("Cluster deleted successfully.");
        } catch (error) {
            console.error("Failed to delete cluster:", error);
        }
    };

    return (
        <ClusterContext.Provider
            value={{
                getClusters,
                formError,
                setFormError,
                successMessage,
                setSuccessMessage,
                getToken,
                getOrg,
                addCluster,
                deleteCluster,
            }}>
            {children}
        </ClusterContext.Provider>
    );
};

export const useClusterContext = () => useContext(ClusterContext);