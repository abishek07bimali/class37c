import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  // block for js 
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<div> login</div>} />
         <Route path="/register" element={<div> register</div>} />
         <Route path="/contact" element={<div> conatct</div>} />
      </Routes>
    </Router>
  )
}

export default App
