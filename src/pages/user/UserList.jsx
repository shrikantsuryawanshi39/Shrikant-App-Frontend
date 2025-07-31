import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../context/UserContext";

const UserList = () => {
  const { getUsers } = useUserContext();
  const { deleteUser } = useUserContext();

  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const scrollRef = useRef(null);
  const limit = 100;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers(page, limit);
        setAllUsers(users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [page, getUsers]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const result = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.id.toString().includes(term)
    );
    setFilteredUsers(result);
  }, [searchTerm, allUsers]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [page]);

  const handleNext = () => {
    if (allUsers.length === limit) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const handleDeleteUser = async (user) => {
    const id = user.id;
    const role = user.role;
    console.log(user)
    if (role === "admin" || role === "ADMIN") {
      alert("Cannot delete an admin user.");
      return;
    } else {
      deleteUser(id);
      if (window.confirm("Are you sure you want to delete this User?")) {
        const users = await getUsers(page, limit);
        setAllUsers(users);
      }
    }
  }

  return (
    <div className="p-6 text-black">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold mb-2">User Details</h1>

        <div className="flex justify-between items-center mb-3 px-3 border border-gray-600 rounded-4xl w-full max-w-3xs">
          <input
            type="text"
            placeholder="Search by name, role, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none w-60 p-1 bg-transparent"
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-auto max-h-[462px] border-t shadow text-xs sm:text-sm">
        <table className="w-[180dvw] sm:w-[120dvw] md:w-full text-xs lg:text-sm border-b">
          <thead className="bg-gray-300 sticky top-0 z-10">
            <tr>
              <th className="p-1 sm:p-2 border-x">User ID</th>
              <th className="p-1 sm:p-2 border-x">Name</th>
              <th className="p-1 sm:p-2 border-x">Email</th>
              <th className="p-1 sm:p-2 border-x">Type</th>
              <th className="p-1 sm:p-2 border-x">Description</th>
              <th className="p-1 sm:p-2 border-x">Created At</th>
              <th className="p-1 sm:p-2 border-x">Remove</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100">
                <td className="p-1 sm:p-2 text-center border font-semibold">
                  {user.id}
                </td>
                <td className="p-1 sm:p-2 border text-center">{user.name}</td>
                <td className="p-1 sm:p-2 border text-center">{user.email}</td>
                <td className="p-1 sm:p-2 text-center border capitalize">
                  {user.role.toUpperCase()}
                </td>
                <td className="p-1 sm:p-2 border text-center">
                  {user.description}
                </td>
                <td className="p-1 sm:p-2 border text-center">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="p-1 sm:p-2 border text-center"><button className="px-2 py-0.5 border w-full bg-red-200 hover:bg-red-300 hover:cursor-pointer transition duration-200" onClick={() => { handleDeleteUser(user) }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4 max-w-md mx-auto">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-1 sm:py-2 rounded disabled:opacity-50">
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={allUsers.length < limit}
          className="bg-gray-800 hover:bg-gray-600 text-white px-4 py-1 sm:py-2 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
