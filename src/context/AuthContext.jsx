import { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [credentialsValidated, setCredentialsValidated] = useState(false);
    const [orgs, setOrgs] = useState([]);
    const [formError, setFormError] = useState("");

    const API_BASE_URL = import.meta.env.VITE_APPLICATION_BACKEND_BASE_URL;

    // Validate and Login ====================>>>>>>>>>>>>>
    const validate = async ({ email, password }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password,
            });
            setOrgs(response.data);
            setCredentialsValidated(true);
            setFormError("");
        } catch (error) {
            console.error(error)
            const msg = error.response?.data || "Invalid email or password.";
            setFormError(msg);
        }
    };

    const login = async ({ email, password, orgId }) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/login/org/${orgId}`,
                { email, password, orgId },
                { withCredentials: true }
            );

            const { token } = response.data;
            Cookies.set("jwt", token, { path: "/", secure: true });
            Cookies.set("orgId", orgId, { path: "/" });
            Cookies.set("email", email, { path: "/" });
            setFormError("");
            window.location.href = "/";
        } catch (error) {
            const msg =
                error.response?.data ||
                "Login failed. Please check your credentials and try again.";
            setFormError(msg);
        }
    };

    // signup ================>>>>>>>>>>
    const onSignup = async (payload, reset, navigate) => {
        try {
            await axios.post(`${API_BASE_URL}/signup`, payload);
            setFormError("");
            reset();
            navigate("/login");
        } catch (error) {
            const msg = error.response?.data || "Signup failed";
            setFormError(msg);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                credentialsValidated,
                setCredentialsValidated,
                orgs,
                formError,
                setFormError,
                validate,
                login,
                onSignup,
            }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
