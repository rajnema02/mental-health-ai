import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/slices/alertsSlice';

const AlertModal = ({ closeModal }) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(addAlert({ name }));
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-full max-w-md">
        <h3 className="font-semibold mb-2">Create Alert</h3>
        <form onSubmit={submit}>
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Alert name" className="w-full p-2 border rounded mb-3" required />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertModal;
