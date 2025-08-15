import Login from "./Login"
import Signup from "./signup";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Home";
import Navbar from "./components/Navbar";



function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

    
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App