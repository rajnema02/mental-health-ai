const Button = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;