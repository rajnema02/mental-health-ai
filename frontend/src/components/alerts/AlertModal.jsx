import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAlert } from "../../store/slices/alertsSlice";

const AlertModal = ({ closeModal }) => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Alert name cannot be empty.");
      return;
    }

    dispatch(addAlert({ name }));
    closeModal(); // close after successful dispatch
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Alert</h2>

        <form onSubmit={handleSubmit}>
          {/* ALERT NAME FIELD */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Alert Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g., Exam Stress, Rainfall Warning"
              required
            />

            <p className="text-xs text-gray-500 mt-1">
              Note: For demo, all alerts use a default zone.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertModal;
