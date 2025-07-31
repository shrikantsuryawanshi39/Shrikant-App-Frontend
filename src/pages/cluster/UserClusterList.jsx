import React, { useEffect, useRef, useState } from "react";
import dummyUserClusterData from "../../assets/dummyUserClusterData.json";

const UserClusterList = () => {
  const [allUserClusters, setAllUserClusters] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUserClusters, setFilteredUserClusters] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    setAllUserClusters(dummyUserClusterData);
  }, []);

  useEffect(() => {
    const start = page * 10;
const clustersInPage = allUserClusters.slice(start, start + 10);

    if (searchTerm.trim() === "") {
      setFilteredUserClusters(clustersInPage);
    } else {
      const term = searchTerm.toLowerCase();
      const result = clustersInPage.filter(
        (uc) =>
          uc.userId.toString().includes(term) ||
          uc.clusterId.toString().includes(term) ||
          uc.id.toString().includes(term)
      );
      setFilteredUserClusters(result);
    }
  }, [searchTerm, allUserClusters, page]);

  const handleNext = () => {
    if ((page + 1) * 10 < allUserClusters.length) {
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

  return (
    <div className="p-6 h-screen  text-black">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl md:text-3xl font-bold mb-2">User Cluster</h1>

        <div className="flex justify-between items-center mb-3 px-3 border-1 border-gray-600 rounded-4xl w-full max-w-3xs">
          <input
            type="text"
            placeholder="Search by User ID, Cluster ID or Record ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none w-60 p-1"
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-auto max-h-[462px] border border-l-0 shadow text-xs sm:text-sm">
        <table className="w-full min-w-[800px] text-xs lg:text-sm">
          <thead className="bg-gray-300 sticky top-0 z-10 outline-1">
            <tr>
              <th className="p-2 border-x">ID</th>
              <th className="p-2 border-x">User ID</th>
              <th className="p-2 border-x">Cluster ID</th>
              <th className="p-2 border-x">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserClusters.map((uc) => (
              <tr key={uc.id} className="hover:bg-gray-100">
                <td className="p-2 text-center border font-semibold">{uc.id}</td>
                <td className="p-2 text-center border">{uc.userId}</td>
                <td className="p-2 text-center border">{uc.clusterId}</td>
                <td className="p-2 text-center border">
                  {new Date(uc.createdAt).toLocaleString()}
                </td>
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
          disabled={(page + 1) * 10 >= allUserClusters.length}
          className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50 transition duration-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default UserClusterList;
