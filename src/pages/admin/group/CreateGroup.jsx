import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import '../../../App.css';
import { useGroupContext } from "../../../context/GroupContext";

const CreateGroup = () => {
    const { createGroup } = useGroupContext();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const success = await createGroup({ groupName: data.name, description: data.description });
        if (success) {
            reset();
            navigate("/groups");
        }
    };

    return (
        <div className="p-6 text-black max-w-md mx-auto h-screen flex items-center scrollbar-hidden">
            <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-300 w-full">
                <h1 className="text-xl font-bold mb-4">Create New Group</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
                    <div>
                        <label className="block mb-1">Group Name</label>
                        <input
                            {...register("name", { required: "Group name is required" })}
                            className="w-full p-2 border rounded bg-gray-50 outline-none"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            className="w-full p-2 border rounded bg-gray-50 outline-none scrollbar-hidden"
                        />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer disabled:opacity-50 transition duration-300"
                    >
                        Create Group
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateGroup;
