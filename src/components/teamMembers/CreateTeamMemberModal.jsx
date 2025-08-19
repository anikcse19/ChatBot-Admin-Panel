import React from "react";
import { useForm } from "react-hook-form";
import { getCurrentAdmin } from "../../utils/auth";
import { Modal } from "antd";
import { createTeamMember } from "../../api/adminApi";
import { toast } from "sonner";

const CreateTeamMemberModal = ({ open, setOpen, fetchTeamMembers }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
  });
  const currentAdmin = getCurrentAdmin();
  const onSubmit = async (data) => {
    try {
      const teamData = {
        ...data,
        adminId: currentAdmin?.id,
      };
      const res = await createTeamMember(teamData);
      if (res) {
        fetchTeamMembers();
        reset();
        setOpen(false);
        toast.success("Member create successfully");
      }
    } catch (error) {
      console.error("Error creating member:", error);
      toast.error("Error creating member");
    }
  };
  return (
    <Modal
      title="Create Ticket"
      footer={null}
      open={open}
      onCancel={() => setOpen(false)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create User</h2>

        {/* Name */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium">Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select role</option>
            <option value="sub-admin">Sub-Admin</option>
            <option value="agent">Agent</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Create User
        </button>
      </form>
    </Modal>
  );
};

export default CreateTeamMemberModal;
