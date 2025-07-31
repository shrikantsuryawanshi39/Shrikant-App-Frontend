import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext.jsx"
import { ClusterProvider } from "./context/ClusterContext.jsx";
import { UserClusterProvider } from "./context/UserClusterContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserClusterProvider>
      <AuthProvider>
        <UserProvider>
          <ClusterProvider>
            <App />
          </ClusterProvider>
        </UserProvider>
      </AuthProvider>
    </UserClusterProvider>
  </StrictMode>
);
