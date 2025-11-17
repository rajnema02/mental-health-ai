const Loader = () => (
<>
<style>{`
.loader{ height:30px; width:30px; border:4px solid #2a3f61; border-top-color:#1a73e8; border-radius:50%; animation:spin 1s linear infinite; margin:auto; }
@keyframes spin{ to{ transform:rotate(360deg); } }
`}</style>
<div className="loader"></div>
</>
);
export default Loader;