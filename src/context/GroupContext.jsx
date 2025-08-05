import { createContext, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    const API_BASE_URL = import.meta.env.VITE_APPLICATION_BACKEND_BASE_URL;

    // ✅ Helper: Get headers with JWT token
    const getAuthHeaders = () => {
        const token = Cookies.get("jwt");
        return {
            withCredentials: true,
            headers: {
                Authorization: token,
            },
        };
    };

    // Get all groups for an organization
    const getGroups = async () => {
        try {
            const orgId = Cookies.get("orgId");
            const res = await axios.get(`${API_BASE_URL}/orgs/${orgId}/groups`, getAuthHeaders());
            return res.data || [];
        } catch (err) {
            console.error("Failed to fetch groups", err);
            return [];
        }
    };

    // Create a new group
    const createGroup = async ({ groupName, description }) => {
        try {
            const orgId = Cookies.get("orgId");
            const payload = { name: groupName, description: description };
            const res = await axios.post(`${API_BASE_URL}/orgs/${orgId}/groups`, payload, getAuthHeaders());
            return res.data;
        } catch (err) {
            console.error("Failed to create group", err);
            throw err;
        }
    };

    // Delete a group
    const deleteGroup = async (groupId) => {
        try {
            const orgId = Cookies.get("orgId");
            await axios.delete(`${API_BASE_URL}/orgs/${orgId}/groups/${groupId}`, getAuthHeaders());
            return true;
        } catch (err) {
            console.error("Failed to delete group", err);
            return false;
        }
    };

    // Add user to group
    const handleUsersInGroup = async (userId, groupId, action) => {
        try {
            const orgId = Cookies.get("orgId");
            const payload = { id: groupId, action };
            await axios.post(`${API_BASE_URL}/orgs/${orgId}/user/${userId}`, payload, getAuthHeaders());
            return true;
        } catch (err) {
            console.error("Failed to add user to group", err);
            return false;
        }
    };

    const getGroupUsers = async (groupId) => {
        try {
            const orgId = Cookies.get("orgId");
            const res = await axios.get(`${API_BASE_URL}/orgs/${orgId}/groups/${groupId}`, getAuthHeaders());
            return res.data;
        } catch (error) {
            console.error("Failed to get users of this group");
            return [];
        }
    }

    return (
        <GroupContext.Provider
            value={{
                getGroups,
                createGroup,
                deleteGroup,
                handleUsersInGroup,
                getGroupUsers
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};

export const useGroupContext = () => useContext(GroupContext);
