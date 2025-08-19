import React, { useEffect, useState } from "react";
import { getAllTickets } from "../api/ticketApi"; // adjust path if needed
import { API } from "../config/baseUrl";

const TicketListPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await getAllTickets();
      setTickets(response?.data?.tickets); // assuming API returns { tickets: [...] }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Update backend
      await API.patch(`/ticket/${id}`, { status: newStatus });

      // Update local state
      const updatedTickets = tickets.map((ticket) =>
        ticket._id === id ? { ...ticket, status: newStatus } : ticket
      );
      setTickets(updatedTickets);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  if (loading) return <p className="p-4">Loading tickets...</p>;

  return (
    <div className="p-6 bg-white  shadow-lg shadow-gray-300">
      <table className="min-w-full  ">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Priority</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{ticket.subject}</td>
              <td className="border px-4 py-2">{ticket.userId}</td>
              <td className="border px-4 py-2">{ticket.description}</td>
              <td className="border px-4 py-2">{ticket.category}</td>
              <td className="border px-4 py-2">{ticket.priority}</td>
              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    ticket.status === "Pending"
                      ? "bg-yellow-500"
                      : ticket.status === "Open"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="border px-4 py-2">
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    handleStatusChange(ticket._id, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketListPage;
