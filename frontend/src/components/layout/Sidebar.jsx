import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = ({ isActive }) => `block px-4 py-2 rounded ${isActive ? 'bg-gray-700 text-white' : 'text-gray-200 hover:bg-gray-600'}`;
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Project Vesta</h2>
      <nav>
        <NavLink to="/admin-dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/alerts" className={linkClass}>Alerts</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
