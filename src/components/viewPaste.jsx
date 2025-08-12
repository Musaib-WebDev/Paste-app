import {  useSelector } from "react-redux";
import { useParams} from "react-router-dom";


const viewPaste = () => {
  const{id} = useParams()
  const allPastes = useSelector((state)=>state.paste.pastes)
  const paste = allPastes.filter((p)=>p._id === id)[0]
  return (
    <div>
      <div className="bg-[#0d0d0d] min-h-screen text-white p-4">
      {/* Top Bar */}
      {/* Title Input */}
      <input
        value={paste.Title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        disabled
       
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
          value={paste.content}
          disabled
          className="w-full min-h-[300px] sm:min-h-[500px] md:min-h-[700px] bg-[#1a1a1a] text-sm font-mono p-4 text-white outline-none resize-none"
        ></textarea>
      </div>
    </div>
    </div>
  )
}

export default viewPaste
