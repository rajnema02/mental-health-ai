import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../store/slices/userPostSlice";
import Loader from "../common/Loader";

const PostUploadForm = () => {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();

  // Redux: user post state
  const { status, error } = useSelector((state) => state.userPosts);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!caption || !imageUrl) {
      alert("Please provide both a caption and an image URL.");
      return;
    }

    dispatch(createNewPost({ caption, imageUrl }));

    // Reset form
    setCaption("");
    setImageUrl("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">New Analysis</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* CAPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows="3"
            placeholder="How are you feeling?"
          ></textarea>
        </div>

        {/* IMAGE URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Paste an image link..."
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && status === "failed" && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? <Loader /> : "Analyze Post"}
        </button>
      </form>
    </div>
  );
};

export default PostUploadForm;
