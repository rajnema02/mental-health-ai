import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../store/slices/userPostSlice";

const PostUploadForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.userPosts);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // For preview
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }
    setImage(null);
    setPreview("");
    setCaption("");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    dispatch(uploadPost(formData));
  };

  return (
    <>
      <style>{`
        .upload-box input[type=file]{
          background:#0f1a2e; border:1px solid #1e3050;
          color:white; padding:10px; border-radius:8px;
        }
        .upload-preview{
          width:100%; border-radius:10px; margin-top:10px;
        }
        .upload-textarea{
          background:#0f1a2e; border:1px solid #1e3050; color:white;
          padding:10px; border-radius:8px; width:100%; height:100px;
        }
        .upload-btn{
          background:#1a73e8; padding:12px; border-radius:8px;
          color:white; font-weight:600; width:100%;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="upload-box" style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
        <input type="file" accept="image/*" onChange={handleImage} required />

        {preview && <img style={{height:'200px', width:'250px'}} src={preview} className="upload-preview" alt="preview" />}

        <textarea
          className="upload-textarea"
          placeholder="Write something..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button type="submit" className="upload-btn" disabled={status === "loading"}>
          {status === "loading" ? "Uploading..." : "Upload Post"}
        </button>
      </form>
    </>
  );
};

export default PostUploadForm;
