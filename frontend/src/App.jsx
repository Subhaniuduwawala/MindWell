import Login from "./Login"
import Signup from "./signup";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Home";
import Service from "./Service";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

    
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Service" element={<Service/>} />


      </Routes>
       <Footer />
    </BrowserRouter>
  )
}

export default App