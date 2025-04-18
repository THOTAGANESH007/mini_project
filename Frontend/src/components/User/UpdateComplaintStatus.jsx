import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UpdateComplaintStatus = () => {
    const navigate=useNavigate();
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/api/complaints/${id}`);
        setComplaint(res.data.data);
        setNewStatus(res.data.data.status); // Initialize dropdown with current status
      } catch (err) {
        console.error("Error fetching complaint detail", err);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      const res = await axios.patch(`http://localhost:9999/api/complaints/${id}`, {
        status: newStatus,
      });

      if (res.data.success) {
        // alert("Status updated successfully!");
        setComplaint({ ...complaint, status: newStatus });
        navigate(-1);      }
    } catch (err) {
      console.error("Error updating complaint status", err);
      alert("Failed to update status.");
    }
  };

  if (!complaint) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {complaint.imageUrl ? (
        <img
          src={complaint.imageUrl}
          alt="Complaint"
          className="w-full h-96 object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
          No Image Available
        </div>
      )}

      <div className="mt-6 space-y-3">
        <p><strong>User ID:</strong> {complaint.userId}</p>
        <p><strong>Email:</strong> {complaint.email}</p>
        <p><strong>Phone:</strong> {complaint.phone}</p>
        <p><strong>Description:</strong> {complaint.description}</p>

        <label className="block">
          <strong>Status:</strong>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="ml-2 border rounded px-3 py-2 mt-1"
          >
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
            <option value="Processing">Processing</option>
            <option value="Resolved">Resolved</option>
          </select>
        </label>

        <button
          onClick={handleUpdateStatus}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default UpdateComplaintStatus;
