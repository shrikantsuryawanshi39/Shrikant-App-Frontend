import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext.jsx"
import { ClusterProvider } from "./context/ClusterContext.jsx";
import { ClusterAssignmentProvider } from "./context/ClusterAssignmentContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClusterAssignmentProvider>
      <AuthProvider>
        <UserProvider>
          <ClusterProvider>
            <App />
          </ClusterProvider>
        </UserProvider>
      </AuthProvider>
    </ClusterAssignmentProvider>
  </StrictMode>
);
