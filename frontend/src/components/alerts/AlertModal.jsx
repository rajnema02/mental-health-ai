import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../store/slices/alertsSlice';


const AlertModal = ({ closeModal }) => {
const [name, setName] = useState('');
const dispatch = useDispatch();


const submit = e => {
e.preventDefault();
dispatch(addAlert({ name }));
closeModal();
};


return (
<>
<style>{`
.modal-bg{ position:fixed; inset:0; background:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; }
.modal-box{ background:#141f33; padding:20px; width:90%; max-width:420px; border-radius:10px; color:white; }
.modal-input{ width:100%; padding:10px; border-radius:6px; margin-bottom:10px; }
`}</style>


<div className="modal-bg">
<div className="modal-box">
<h3>Create Alert</h3>
<form onSubmit={submit}>
<input value={name} onChange={e=>setName(e.target.value)} className="modal-input" placeholder="Alert name" required />


<div style={{ display:'flex', justifyContent:'flex-end', gap:'10px' }}>
<button type="button" onClick={closeModal}>Cancel</button>
<button type="submit">Create</button>
</div>
</form>
</div>
</div>
</>
);
};


export default AlertModal;