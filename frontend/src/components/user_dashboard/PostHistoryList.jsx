// src/components/user_dashboard/PostHistoryList.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPosts } from "../../store/slices/userPostSlice";
import Loader from "../common/Loader";

/**
 * FEATURES:
 * - Grid/List toggle
 * - Click image to open zoom modal
 * - Delete post (calls DELETE /api/posts/:id)
 * - AI result color badges
 * - Responsive cards with inline css
 *
 * Notes:
 * - Assumes your auth token is available in Redux at state.auth.token (change if different)
 * - DELETE request attaches Authorization: Bearer <token>
 */

const formatDate = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  return isNaN(dt) ? "" : dt.toLocaleString();
};

const riskColor = (risk) => {
  if (!risk) return "#94a3b8"; // muted
  switch (risk.toLowerCase()) {
    case "high":
      return "#ef4444"; // red
    case "medium":
      return "#f59e0b"; // orange
    case "low":
      return "#10b981"; // green
    default:
      return "#94a3b8";
  }
};

const PostHistoryList = ({ posts: incoming }) => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((s) => s.userPosts);
  const token = useSelector((s) => s.auth?.token); // adjust if your token is stored differently

  const [listMode, setListMode] = useState("grid"); // 'grid' or 'list'
  const [zoomImage, setZoomImage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

  const list = incoming || posts || [];

  const handleDelete = async (id) => {
    if (!confirm("Delete this post? This action cannot be undone.")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to delete");
      }
      // refresh posts
      await dispatch(fetchMyPosts());
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Could not delete post");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <style>{`
        .history-wrap { color: white; }
        .history-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; gap:12px; }
        .history-title { font-size:1.25rem; font-weight:700; }
        .mode-toggle { display:flex; gap:8px; }
        .mode-btn { background:transparent; border:1px solid #243759; color:#cbd5e1; padding:6px 10px; border-radius:8px; cursor:pointer; }
        .mode-btn.active { background:#1f2a44; color:#fff; border-color:#3b82f6; box-shadow:0 1px 0 rgba(0,0,0,0.2); }

        /* grid list */
        .grid { display:grid; gap:14px; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
        .list { display:block; }

        .card {
          background: linear-gradient(180deg, #0f1a2e 0%, #141f33 100%);
          border-radius:12px;
          padding:12px;
          border:1px solid #1e3050;
          box-shadow: 0 6px 16px rgba(2,6,23,0.25);
          transition: transform .12s ease, box-shadow .12s ease;
        }
        .card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(2,6,23,0.35); }

        .card-meta { display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:8px; }
        .date { color:#9ca3af; font-size:0.85rem; }

        .img-wrap { width:100%; height:180px; border-radius:10px; overflow:hidden; background:#0b1220; display:flex; align-items:center; justify-content:center; }
        .img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }

        .caption { margin-top:8px; font-size:0.97rem; line-height:1.35; color:#e6eef8; }

        .ai-row { display:flex; justify-content:space-between; align-items:center; margin-top:10px; gap:8px; flex-wrap:wrap; }
        .ai-badge { padding:6px 10px; border-radius:999px; color:white; font-weight:700; font-size:0.86rem; display:inline-flex; align-items:center; gap:8px; }
        .ai-meta { color:#b3b3b3; font-size:0.9rem; }

        .card-actions { display:flex; gap:8px; margin-top:10px; justify-content:flex-end; }
        .btn { padding:8px 12px; border-radius:8px; cursor:pointer; border:1px solid transparent; font-weight:600; }
        .btn.danger { background:#ef4444; color:white; }
        .btn.ghost { background:transparent; border:1px solid #243759; color:#cbd5e1; }

        /* Zoom modal */
        .zoom-bg { position:fixed; inset:0; background: rgba(0,0,0,0.75); display:flex; align-items:center; justify-content:center; z-index:60; padding:18px; }
        .zoom-img { max-width:100%; max-height:90vh; border-radius:10px; box-shadow:0 10px 40px rgba(0,0,0,0.6); }

        /* responsive tweaks */
        @media (max-width:760px) {
          .img-wrap { height:200px; }
          .card { padding:12px; }
        }
        @media (max-width:420px) {
          .img-wrap { height:160px; }
        }
      `}</style>

      <div className="history-wrap">
        <div className="history-header">
          <div className="history-title">Your History</div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div className="mode-toggle" role="tablist" aria-label="View mode">
              <button
                className={`mode-btn ${listMode === "grid" ? "active" : ""}`}
                onClick={() => setListMode("grid")}
              >
                Grid
              </button>
              <button
                className={`mode-btn ${listMode === "list" ? "active" : ""}`}
                onClick={() => setListMode("list")}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {status === "loading" && list.length === 0 ? (
          <Loader />
        ) : list.length === 0 ? (
          <div style={{ color: "#9ca3af" }}>No posts yet.</div>
        ) : (
          <div className={listMode === "grid" ? "grid" : "list"}>
            {list.map((p) => {
              const risk = p.ai_result?.risk_level || "";
              const badgeColor = riskColor(risk);

              return (
                <article key={p._id} className="card" role="article">
                  <div className="card-meta">
                    <div className="date">{formatDate(p.createdAt)}</div>

                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div
                        className="ai-badge"
                        style={{ background: badgeColor }}
                        aria-hidden
                      >
                        {p.ai_result?.emotion ? p.ai_result.emotion : "unknown"}
                      </div>
                    </div>
                  </div>

                  {/* Image (click to zoom) */}
                  <div
                    className="img-wrap"
                    style={{ cursor: p.image ? "zoom-in" : "default" }}
                    onClick={() => p.image && setZoomImage(p.image)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && p.image) setZoomImage(p.image);
                    }}
                    aria-label="Open image"
                  >
                    {p.image ? (
                      // show image; onError hides image
                      <img
  src={p.image?.replace("undefined/", "")}
  alt={p.caption}
  onError={(e) => (e.target.style.display = "none")}
/>

                    ) : (
                      <div style={{ color: "#94a3b8" }}>No image</div>
                    )}
                  </div>

                  <div className="caption">"{p.caption}"</div>

                  <div className="ai-row">
                    <div className="ai-meta">
                      Emotion:{" "}
                      <strong style={{ color: "#e6eef8" }}>
                        {p.ai_result?.emotion || "N/A"}
                      </strong>{" "}
                      · Risk:{" "}
                      <strong style={{ color: badgeColor }}>
                        {p.ai_result?.risk_level || "N/A"}
                      </strong>
                    </div>

                    <div className="card-actions">
                      <button
                        className="btn ghost"
                        onClick={() => window.open(p.image || "#", "_blank")}
                        disabled={!p.image}
                      >
                        Open
                      </button>

                      <button
                        className="btn danger"
                        onClick={() => handleDelete(p._id)}
                        disabled={deletingId === p._id}
                      >
                        {deletingId === p._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Zoom modal */}
      {zoomImage && (
        <div
          className="zoom-bg"
          onClick={() => setZoomImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={zoomImage}
            alt="Zoom"
            className="zoom-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default PostHistoryList;