// App.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice"; 
export default function home() {
  const [code, setCode] = useState("");
  const [Title, setTitle] = useState("");
  const [type, setType] = useState("Code");
  const [expiry, setExpiry] = useState("1 Month");
  const [visibility, setVisibility] = useState("Public");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch()
  const allPastes = useSelector((state)=>state.paste.pastes)

  useEffect(() => {
   if(pasteId){
    const paste = allPastes.find((p)=>p._id === pasteId)
    setTitle(paste.Title)
    setType(paste.type)
    setVisibility(paste.visibility)
    setCode(paste.content)
    setExpiry(paste.expiry)
   }
  }, [pasteId])
  

  function createPaste() {
    const paste = {
    type,        // पहले dropdown का state
    expiry,      // दूसरे dropdown का state
    _id:pasteId || Date.now().toString(36),
    visibility,  // तीसरे dropdown का state
    Title,       // title input का state
    content: code, // code editor का state
    createdAt: new Date().toISOString() // टाइम स्टैम्प (optional)
  };
  if (pasteId) {
    dispatch(updateToPastes(paste))
  }
  else{
     dispatch(addToPastes(paste))
  }

   // ✅ Reset all fields to default
    setType("Code");
    setExpiry("1 Month");
    setVisibility("Public");
    setTitle("");
    setCode("");
  }

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white p-4 sm:p-6">
  {/* Top Bar */}
  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
    {/* Type Select */}
    <select
      className="bg-[#1a1a1a] px-3 py-2 rounded text-sm w-full md:w-auto"
      value={type}
      onChange={(e) => setType(e.target.value)}
    >
      <option>Code</option>
      <option>Text</option>
      <option>Json</option>
    </select>

    {/* Expiry Select */}
    <select
      className="bg-[#1a1a1a] px-3 py-2 rounded text-sm w-full md:w-auto"
      value={expiry}
      onChange={(e) => setExpiry(e.target.value)}
    >
      <option>1 Month</option>
      <option>1 Year</option>
      <option>Never</option>
    </select>

    {/* Visibility Select */}
    <select
      className="bg-[#1a1a1a] px-3 py-2 rounded text-sm w-full md:w-auto"
      value={visibility}
      onChange={(e) => setVisibility(e.target.value)}
    >
      <option>Public</option>
      <option>Private</option>
    </select>

    <button
      onClick={createPaste}
      className="bg-[#2563eb] hover:bg-[#1d4ed8] px-4 py-2 rounded text-sm font-medium w-full md:w-auto md:ml-auto"
    >
      {pasteId ? "Update Paste" : "Create Paste"}
    </button>
  </div>

  {/* Title Input */}
  <input
    value={Title}
    onChange={(e) => setTitle(e.target.value)}
    type="text"
    placeholder="Title"
    className="w-full bg-[#1a1a1a] p-3 rounded mb-4 outline-none text-sm"
  />

  {/* Code Editor */}
  <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
    {/* Editor Header */}
    <div className="flex items-center gap-2 p-2 bg-[#2a2a2a]">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>

    {/* Code Area */}
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className="w-full min-h-[300px] sm:min-h-[500px] md:min-h-[700px] bg-[#1a1a1a] text-sm font-mono p-4 text-white outline-none resize-none"
    ></textarea>
  </div>
</div>
  );
}
