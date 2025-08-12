import { useState } from "react";
import { FaEdit, FaTrash, FaShare, FaEye, FaCopy } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { toast } from "react-toastify";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const formatDateTime = (isoDate) => {
    if (!isoDate) return "No Expiry";
    const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    const datePart = new Date(isoDate).toLocaleDateString("en-GB", dateOptions);
    const timePart = new Date(isoDate).toLocaleTimeString("en-US", timeOptions);

    return `${datePart}, ${timePart}`;
  };

  // Filtered data based on search
  const filteredPastes = pastes.filter((paste) => {
    const title = paste?.Title || "";
    const content = paste?.content || "";
    const searchTerm = search.toLowerCase();
    return (
      title.toLowerCase().includes(searchTerm) ||
      content.toLowerCase().includes(searchTerm)
    );
  });

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
<div className="bg-[#0d0d0d] flex flex-col items-center min-h-screen text-white p-4 sm:p-6">
  {/* Search bar */}
  <input
    type="text"
    placeholder="Search question here..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full sm:w-3/4 md:w-2/4 p-3 rounded bg-[#1a1a1a] text-sm mb-6 outline-none"
  />

  <h1 className="text-2xl font-bold mb-4">All Pastes</h1>

  {/* Pastes List */}
  <div className="space-y-4 w-full sm:w-3/4 md:w-2/4">
    {filteredPastes.length > 0 ? (
      filteredPastes.map((paste) => (
        <div
          key={paste._id}
          className="bg-[#111] p-4 rounded border border-gray-700"
        >
          <h2 className="text-lg sm:text-xl text-white font-bold break-words">
            {paste.Title || "Untitled"}
          </h2>
          <p className="text-gray-400 text-sm truncate">
            {paste.content || "No content"}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
            {/* Action buttons */}
            <div className="flex gap-2">
              <button className="p-2 bg-[#1a1a1a] rounded hover:bg-[#222]">
                <a href={`/?pasteId=${paste?._id}`}><FaEdit /></a>
              </button>
              <button
                onClick={() => handleDelete(paste?._id)}
                className="p-2 bg-[#1a1a1a] rounded hover:bg-[#222]"
              >
                <FaTrash />
              </button>
              <button className="p-2 bg-[#1a1a1a] rounded hover:bg-[#222]">
                <a href={`/pastes/${paste?._id}`}><FaEye /></a>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste?.content);
                  toast.success("Copied To Clipboard");
                }}
                className="p-2 bg-[#1a1a1a] rounded hover:bg-[#222]"
              >
                <FaCopy />
              </button>
            </div>

            {/* Date and type */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="bg-green-600 px-3 py-1 rounded text-xs font-bold">
                {paste.type || "CODE"}
              </span>
              <div className="flex items-center gap-1 text-gray-400">
                <MdDateRange /> {paste.expiry || "No Expiry"}
              </div>
              <span className="text-gray-400 px-3 py-1 rounded text-xs font-bold">
                {formatDateTime(paste.createdAt) || "No date"}
              </span>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No pastes found.</p>
    )}
  </div>
</div>
  );
};

export default Paste;
