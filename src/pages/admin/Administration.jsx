import React, { useState } from "react";
import { NavLink } from "react-router";
import UserList from "../user/UserList";
import ClusterList from "../cluster/ClusterList";

const Administration = () => {
  const [userExpanded, setUserExpanded] = useState(false);
  const [clusterExpanded, setClusterExpanded] = useState(false);

  return (
    <div className="block">
      <div className="w-[95dvw] bg-[rgba(196,196,196,0.36)] text-black flex flex-col items-center justify-center mx-auto my-10 rounded-2xl shadow-lg p-20">
        {/* User Section */}
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setUserExpanded(!userExpanded)}
            className="bg-blue-700 text-white px-4 py-1 text-center cursor-pointer rounded hover:bg-blue-600 transition duration-300 text-sm">
            {userExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
        <div className="w-[90dvw] mb-8 bg-white max-h-full">
          <div
            className={`overflow-hidden border rounded shadow transition-all duration-300 ${
              userExpanded ? "max-h-[800px]" : "max-h-[250px]"
            }`}>
            <UserList />
          </div>
        </div>

        {/* Cluster Section */}
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => setClusterExpanded(!clusterExpanded)}
              className="bg-blue-700 text-white px-4 py-1 text-center cursor-pointer rounded hover:bg-blue-600 transition duration-300 text-sm">
              {clusterExpanded ? "Collapse" : "Expand"}
            </button>
          </div>
        <div className="w-[90dvw] mb-8 bg-white">
          <div
            className={`overflow-hidden border rounded shadow transition-all duration-300 ${
              clusterExpanded ? "max-h-[800px]" : "max-h-[250px]"
            }`}>
            <ClusterList />
          </div>
        </div>

        {/* Buttons */}
        <div className="buttons m-15 mb-25">
          <div className="flex justify-center items-center gap-10 sm:gap-30 mt-5">
            <NavLink to="/AddUser">
              <button className="bg-blue-700 text-white cursor-pointer px-2 py-2 w-30 text-sm sm:w-full sm:text-md rounded hover:bg-blue-600 transition duration-300">
                Add New User
              </button>
            </NavLink>
            <NavLink to="/AddCluster">
              <button className="bg-blue-700 text-white cursor-pointer px-2 py-2 w-30 text-sm sm:w-full sm:text-md rounded ml-4 hover:bg-blue-600 transition duration-300">
                Add New Cluster
              </button>
            </NavLink>
          </div>
        </div>
         <NavLink to="/UserClusters">
          <button className="bg-purple-800 text-white cursor-pointer px-2 py-2 w-30 text-sm sm:w-full sm:text-md rounded ml-4 hover:bg-purple-600 transition duration-300">
            Assign Cluster to User
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Administration;
