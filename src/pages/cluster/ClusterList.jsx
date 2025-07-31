import React, { useEffect, useRef, useState } from "react";
import { useClusterContext } from "../../context/ClusterContext";

const ClusterList = () => {
  const { getClusters } = useClusterContext();
  const { deleteCluster } = useClusterContext();

  const [allClusters, setAllClusters] = useState([]);
  const [filteredClusters, setFilteredClusters] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const clusters = await getClusters();
        setAllClusters(clusters);
      } catch (error) {
        console.error("Failed to fetch clusters:", error);
        setAllClusters([]);
      }
    };

    fetchClusters();
  }, []);

  useEffect(() => {
    const start = page * 100;
    const clustersInPage = allClusters.slice(start, start + 100);

    if (searchTerm.trim() === "") {
      setFilteredClusters(clustersInPage);
    } else {
      const term = searchTerm.toLowerCase();
      const result = clustersInPage.filter(
        (cluster) =>
          cluster.name?.toLowerCase().includes(term) ||
          cluster.clusterId?.toString().includes(term)
      );
      setFilteredClusters(result);
    }
  }, [searchTerm, allClusters, page]);

  const handleNext = () => {
    if ((page + 1) * 100 < allClusters.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [page]);

  const handleDeleteCluster = async (clusterId) => {
    if (window.confirm("Are you sure you want to delete this cluster?")) {
      deleteCluster(clusterId);
      const users = await getClusters();
      setAllClusters(users);
    }
  }

  return (
    <div className="p-6 text-black">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Cluster Details</h1>

        <div className="flex justify-between items-center mb-3 px-3 border-1 border-gray-600 rounded-4xl w-full max-w-3xs">
          <input
            type="text"
            placeholder="Search by Name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none w-60 p-1"
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-auto max-h-[462px] border border-l-0 shadow text-xs sm:text-sm">
        <table className="w-full min-w-[900px] text-xs lg:text-sm">
          <thead className="bg-gray-300 sticky top-0 z-10 outline-1">
            <tr>
              <th className="p-2 border-x">Cluster ID</th>
              <th className="p-2 border-x">Org ID</th>
              <th className="p-2 border-x">Name</th>
              <th className="p-2 border-x">Description</th>
              <th className="p-2 border-x">Active</th>
              <th className="p-2 border-x">Created At</th>
              <th className="p-2 border-x">Remove</th>
            </tr>
          </thead>
          <tbody>
            {filteredClusters.map((cluster) => (
              <tr
                key={cluster.clusterId}
                className="hover:bg-gray-100">
                <td className="p-2 text-center border font-semibold">
                  {cluster.clusterId}
                </td>
                <td className="p-2 text-center border">{cluster.orgId}</td>
                <td className="p-2 border text-center">{cluster.name}</td>
                <td className="p-2 border text-center">
                  {cluster.description}
                </td>
                <td className="p-2 text-center border">
                  {cluster.status ? "Yes" : "No"}
                </td>
                <td className="p-2 border text-center">
                  {cluster.createdAt
                    ? new Date(cluster.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td className="p-1 sm:p-2 border text-center"><button className="px-2 py-0.5 border w-full bg-red-200 hover:bg-red-300 hover:cursor-pointer transition duration-200" onClick={() => { handleDeleteCluster(cluster.clusterId) }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4 max-w-md mx-auto">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50 transition duration-300">
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={(page + 1) * 100 >= allClusters.length}
          className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50 transition duration-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default ClusterList;
