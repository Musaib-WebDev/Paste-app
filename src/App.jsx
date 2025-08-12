import { createBrowserRouter,RouterProvider} from "react-router-dom"
import Nav from "./components/nav"
import Home from "./components/home"
import Paste from "./components/paste"
import ViewPaste from "./components/viewPaste"
const router = createBrowserRouter(
  [
    {
      path:"/",
      element: 
      <div>
        <Nav />
        <Home />
      </div>
    },
        {
      path:"/pastes",
      element: 
      <div>
        <Nav />
        <Paste/>
      </div>
    },
        {
      path:"/pastes/:id",
      element: 
      <div>
        <Nav />
        <ViewPaste />
      </div>
    },
  ]
)
const App = () => {
  return (
<div className=" h-screen text-amber-50 bg-[#0d0d0d]">
  <RouterProvider router={router} />

</div>
  )
}

export default App
