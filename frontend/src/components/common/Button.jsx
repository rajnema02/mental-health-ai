const Button = ({ children, onClick, className='' }) => (
<>
<style>{`
.btn-main{ padding:10px 16px; background:#1a73e8; border-radius:8px; color:white; font-weight:bold; }
`}</style>
<button onClick={onClick} className={`btn-main ${className}`}>{children}</button>
</>
);


export default Button;