import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = 'block px-4 py-2 rounded hover:bg-gray-700';
  const activeLinkClass = 'bg-gray-700';

  return (
    <div className="w-64 h-screen p-4 text-white bg-gray-800">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ''}`
              }
            >
              Live Map
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/alerts"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ''}`
              }
            >
              Manage Alerts
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;