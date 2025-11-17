import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../store/slices/userPostSlice";

const PostUploadForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.userPosts);

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    dispatch(uploadPost(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write something..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Uploading..." : "Upload Post"}
      </button>
    </form>
  );
};

export default PostUploadForm;
