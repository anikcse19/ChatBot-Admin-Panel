/* eslint-disable no-unused-vars */
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { apiKey } from "../../config/baseUrl";
import { createTicket } from "../../api/ticketApi";
import { toast } from "sonner";
import socket from "../../socket";
import { adminReply, getSingleUser } from "../../api/chatApplicationAPI";
import { useState } from "react";
import { getCurrentAdmin } from "../../utils/auth";

export default function CreateTicketModal({
  open,
  setOpen,
  userId,
  sessionId,
}) {
  const [messages, setMessages] = useState([]);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      subject: "",
      category: "",
      priority: "",
      attachments: null,
      description: "",
    },
  });
  const currentUser = getCurrentAdmin();

  const onSubmit = async (data) => {
    try {
      let uploadedImages = "";

      if (data.attachments && data.attachments.length > 0) {
        const files = Array.from(data.attachments);

        for (const file of files) {
          const formData = new FormData();
          formData.append("image", file);

          const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            { method: "POST", body: formData }
          );

          const result = await res.json();
          if (result.success) {
            uploadedImages = result.data.url;
          }
        }
      }
      const user = await getSingleUser(currentUser.id);
console.log("ticket user",user)
      const ticketData = {
        ...data,
        userId,
        createdBy: user?.data?.user?._id,
        linkedChatId: sessionId,
        attachments: uploadedImages,
      };
      console.log(ticketData);
      const response = await createTicket(ticketData);

      if (response) {
        toast.success(response?.data?.message);

        // Create message string locally
        const newMessage = `
Ticket ID: ${response?.data?.ticket?._id}
Subject: ${response?.data?.ticket?.subject}
Priority: ${response?.data?.ticket?.priority}
Status: ${response?.data?.ticket?.status}
Created: ${response?.data?.ticket?.createdAt}
Description: ${response?.data?.ticket?.description}
      `;

        // Send chat message immediately
        const textMsg = {
          sender: "admin",
          type: "text",
          text: newMessage,
          timestamp: new Date(),
        };

        await adminReply({ sessionId, message: textMsg });
        setMessages((prev) => [...prev, textMsg]);
        socket.emit("admin-reply", { sessionId, text: newMessage });
      }

      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error uploading attachments:", error);
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
        className="rounded-lg p-2 mt-4 w-full max-w-lg space-y-3"
      >
        {/* Ticket Title */}
        <div>
          <label className="block font-medium mb-1">
            Ticket Subject / Title
          </label>
          <input
            type="text"
            {...register("subject", { required: true })}
            placeholder="Enter ticket title"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category / Type</label>
          <select
            {...register("category", { required: true })}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select category</option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block font-medium mb-1">Priority</label>
          <select
            {...register("priority", { required: true })}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Attachments */}
        <div>
          <label className="block font-medium mb-1">Attachments</label>
          <input
            type="file"
            {...register("attachments")}
            className="w-full border rounded-md px-3 py-2"
            multiple
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description", { required: true })}
            rows="4"
            placeholder="Write ticket description"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </Modal>
  );
}
