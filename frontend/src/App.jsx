
import Login from "./Login"
import Signup from "./Signup"; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./Home";  
import Service from "./Service";
import Counselors from "./Counselors";

 {/*
import Contact from "./Contact";
import Aboutus from "./Aboutus";
*/}
import Navbar from "./components/Navbar";
import Footer from './components/Footer';



function App() {
  return (
    <BrowserRouter>
      <Navbar />  
      <Routes>

    
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Service" element={<Service/>} />   
        <Route path="/Counselors" element={<Counselors/>} />
      {/*  <Route path="/Contact" element={<Contact/>} />
        <Route path="/Aboutus" element={<Aboutus/>} /> */}


      </Routes>
       <Footer />
    </BrowserRouter>
  );
}
export default App;


