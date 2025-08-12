import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

export const pasteSlice = createSlice({
  name: "paste",
  initialState: {
    pastes: localStorage.getItem("pastes")
      ? JSON.parse(localStorage.getItem("pastes"))
      : [],
  },
  reducers: {
    addToPastes: (state,action) => {
      const paste=action.payload
      state.pastes.push(paste)
      localStorage.setItem("pastes",JSON.stringify(state.pastes))
      toast.success("Add Successfull");
    },
    updateToPastes: (state,action) => {
     const paste=action.payload
     const index=state.pastes.findIndex((item)=>item._id==paste._id)

     if(index>=0){
     state.pastes[index]=paste
      localStorage.setItem("pastes",JSON.stringify(state.pastes))
      toast.success("Update Successfull");
     }
    },
    resetAllPastes: (state, action) => {
     state.pastes = []

     localStorage.removeItem("pastes")
    },
removeFromPastes: (state, action) => {
  const pasteId = action.payload;
  const index = state.pastes.findIndex((item) => item._id == pasteId);
  if (index >= 0) {
    state.pastes.splice(index, 1);
    localStorage.setItem("pastes", JSON.stringify(state.pastes));
    toast.success("Past Deleted");
  }
},
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes,updateToPastes, resetAllPastes,removeFromPastes} = pasteSlice.actions;

export default pasteSlice.reducer;
