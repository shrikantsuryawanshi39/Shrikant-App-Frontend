import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const API_BASE_URL = import.meta.env.VITE_APPLICATION_BACKEND_BASE_URL;
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const getToken = () => Cookies.get("jwt");
  const getOrg = () => Cookies.get("orgId");
  const orgId = getOrg();
  const jwt = getToken();
  
  //Add user from AddUser.jsx
  const addUser = async (data, reset) => {
    if (!orgId || !jwt) {
      setFormError("Missing organization or token.");
      return;
    }

    try {
      const payload = {
        name: data.name,
        email: data.email,
        role: data.type,
        password: data.password,
        description: data.description,
      };

      await axios.post(
        `${API_BASE_URL}/org/${orgId}/user`,
        payload,
        {
          withCredentials: true,
          headers: {
            Authorization: jwt,
          },
        }
      );

      setFormError("");
      setSuccessMessage("User added successfully ✅");
       setTimeout(() => setSuccessMessage(""), 4000);
      reset();
    } catch (error) {
      console.log(error)
      const msg =
        error.response?.data || "Can't add this user, Re-check email or name";
      setFormError(msg);
    }
  };

  // get users at UserList.jsx
  const getUsers = async (page = 0, limit = 100) => {
    if (!orgId || !jwt) {
      throw new Error("Missing organization or token.");
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/org/${orgId}/user?skip=${page * limit}&limit=${limit}`,
        {
          withCredentials: true,
          headers: {
            Authorization: jwt,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error.response?.data || "Failed to fetch users.";
    }
  };

   const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/org/${orgId}/user/${userId}`, {
        withCredentials: true,
        headers: {
          Authorization: jwt,
        },
      });
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        formError,
        setFormError,
        successMessage,
        setSuccessMessage,
        getToken,
        getOrg,
        addUser,
        getUsers,
        deleteUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);