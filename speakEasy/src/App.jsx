import {BrowserRouter as Router,Routes, Route} from "react-router-dom"



import Main from "./pages/Main"
import Input from "./pages/Input"
import { VideoProvider } from "./utils/VideProvider"



function App() {
  return (
    <Router>
      <VideoProvider>
        <Routes>
          <Route path="/" element={<Input/>}/>
          <Route path="/video" element={<Main/>}/>
        </Routes>
      </VideoProvider>
    </Router>
  )
}

export default App
