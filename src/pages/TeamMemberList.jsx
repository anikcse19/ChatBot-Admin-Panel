import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { deleteMember, getAllTeamMembers } from "../api/adminApi";
import { Button, Modal } from "antd";
import { IoTicketSharp } from "react-icons/io5";
import CreateTeamMemberModal from "../components/teamMembers/CreateTeamMemberModal";

import { toast } from "sonner";
import DeleteConfirmModal from "../components/teamMembers/DeleteConfirmModal";

const TeamMemberList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // For delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await getAllTeamMembers();
      console.log(response.data);
      setUsers(response?.data?.subAdmins); // assuming API returns { tickets: [...] }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("team members =", users);
  // ✅ Delete handler with confirmation
  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteMember(selectedUser._id);
      toast.success("Member deleted successfully");
      fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member");
    } finally {
      setSelectedUser(null);
    }
  };

  if (loading) return <p className="p-4">Loading Members...</p>;
  return (
    <div className=" p-8 space-y-6">
      <div className=" flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          color="darkgreen"
          type="primary"
          //   variant="filled"
          size="large"
        >
          <IoTicketSharp /> Create Member
        </Button>
      </div>

      <div className="p-6 bg-white  shadow-lg shadow-gray-300">
        <table className="min-w-full  ">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Joined At</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{user?.name}</td>
                <td className="border px-4 py-2 text-center">{user?.email}</td>
                <td className="border px-4 py-2 text-center">{user?.role}</td>
                <td className="border px-4 py-2 text-center">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </td>
                {/* delete members */}
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setDeleteModalOpen(true);
                    }}
                    className=" bg-red-100 rounded-sm cursor-pointer p-2"
                  >
                    {" "}
                    <Trash color="red"></Trash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateTeamMemberModal
        open={open}
        setOpen={setOpen}
        fetchTeamMembers={fetchTeamMembers}
      />
      <DeleteConfirmModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this member?"
      />
    </div>
  );
};

export default TeamMemberList;
